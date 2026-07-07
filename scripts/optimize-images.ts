#!/usr/bin/env node
/**
 * Optimize WebP assets locally, strip privacy-sensitive metadata, and skip files that have already been processed.
 *
 * Usage:
 *   npm run optimize-images
 *   npm run optimize-images -- --force
 *
 * Requirements:
 *   - cwebp installed and available on PATH
 *     macOS: brew install webp
 *
 * The script strips EXIF/XMP metadata before checking cached hashes. It stores
 * source hashes in .image-optimization-cache.json; unchanged files are skipped.
 */

import { createHash } from 'crypto'
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from 'fs'
import { dirname, extname, join, relative } from 'path'
import { fileURLToPath } from 'url'
import { spawnSync } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const assetsDir = join(rootDir, 'public', 'assets')
const cachePath = join(rootDir, '.image-optimization-cache.json')
const force = process.argv.includes('--force')
const quality = '82'
const minBytesSaved = 512

type Cache = Record<string, { hash: string; size: number; optimizedAt: string }>

function hasCommand(command: string): boolean {
  const result = spawnSync('which', [command], { encoding: 'utf8' })
  return result.status === 0
}

function loadCache(): Cache {
  if (!existsSync(cachePath)) return {}
  try {
    return JSON.parse(readFileSync(cachePath, 'utf8')) as Cache
  } catch {
    return {}
  }
}

function saveCache(cache: Cache) {
  writeFileSync(cachePath, `${JSON.stringify(cache, null, 2)}\n`, 'utf8')
}

function sha256(path: string): string {
  return createHash('sha256').update(readFileSync(path)).digest('hex')
}

function walk(dir: string): string[] {
  if (!existsSync(dir)) return []

  const files: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walk(path))
    else if (entry.isFile()) files.push(path)
  }
  return files
}

function stripWebpMetadata(path: string): { changed: boolean; before: number; after: number } {
  const before = statSync(path).size
  let changed = false

  for (const chunk of ['xmp', 'exif']) {
    const tempPath = `${path}.${chunk}.stripped.tmp.webp`
    const result = spawnSync('webpmux', ['-strip', chunk, path, '-o', tempPath], {
      encoding: 'utf8',
    })

    if (result.status === 0 && existsSync(tempPath)) {
      renameSync(tempPath, path)
      changed = true
    } else {
      rmSync(tempPath, { force: true })
    }
  }

  return { changed, before, after: statSync(path).size }
}

function optimizeWebp(path: string): { changed: boolean; before: number; after: number } {
  const before = statSync(path).size
  const tempPath = `${path}.optimized.tmp.webp`

  const result = spawnSync('cwebp', ['-quiet', '-q', quality, path, '-o', tempPath], {
    encoding: 'utf8',
  })

  if (result.status !== 0) {
    if (existsSync(tempPath)) rmSync(tempPath, { force: true })
    throw new Error(`cwebp failed for ${relative(rootDir, path)}\n${result.stderr || result.stdout}`)
  }

  const after = statSync(tempPath).size
  const saved = before - after

  if (saved >= minBytesSaved && after < before) {
    renameSync(tempPath, path)
    return { changed: true, before, after }
  }

  rmSync(tempPath, { force: true })
  return { changed: false, before, after: before }
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  return `${(bytes / 1024).toFixed(1)} KB`
}

function main() {
  for (const command of ['cwebp', 'webpmux']) {
    if (!hasCommand(command)) {
      console.error(`Missing ${command}. Install it with: brew install webp`)
      process.exit(1)
    }
  }

  mkdirSync(assetsDir, { recursive: true })

  const cache = loadCache()
  const files = walk(assetsDir).sort()
  const nonWebp = files.filter((file) => extname(file).toLowerCase() !== '.webp')

  if (nonWebp.length > 0) {
    console.error('Only .webp files are allowed in public/assets:')
    for (const file of nonWebp) console.error(`- ${relative(rootDir, file)}`)
    process.exit(1)
  }

  let optimized = 0
  let stripped = 0
  let skipped = 0
  let unchanged = 0
  let totalSaved = 0

  for (const file of files) {
    const key = relative(rootDir, file)
    const metadata = stripWebpMetadata(file)
    const currentHash = sha256(file)
    const currentSize = statSync(file).size

    if (metadata.changed) {
      stripped++
      totalSaved += metadata.before - metadata.after
      console.log(`stripped metadata ${key}: ${formatBytes(metadata.before)} → ${formatBytes(metadata.after)}`)
    }

    if (!force && !metadata.changed && cache[key]?.hash === currentHash) {
      skipped++
      continue
    }

    const result = optimizeWebp(file)
    const finalHash = sha256(file)
    const finalSize = statSync(file).size

    cache[key] = {
      hash: finalHash,
      size: finalSize,
      optimizedAt: new Date().toISOString(),
    }

    if (result.changed) {
      optimized++
      const saved = result.before - result.after
      totalSaved += saved
      console.log(`optimized ${key}: ${formatBytes(result.before)} → ${formatBytes(result.after)} saved ${formatBytes(saved)}`)
    } else {
      unchanged++
      console.log(`already small ${key}: ${formatBytes(currentSize)}`)
    }
  }

  saveCache(cache)

  console.log('\nImage optimization complete')
  console.log(`optimized: ${optimized}`)
  console.log(`stripped:   ${stripped}`)
  console.log(`unchanged:  ${unchanged}`)
  console.log(`skipped:    ${skipped}`)
  console.log(`saved:      ${formatBytes(totalSaved)}`)
}

main()
