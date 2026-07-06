#!/usr/bin/env node
/**
 * Create a new draft blog post for NaeesSecurity / NaeesWrites.
 *
 * Usage:
 *   npm run new-post "My Post Title"
 *   npm run new-post -- --plain-url "My Post Title"
 *
 * Creates a draft file in src/content/posts/ with today's date.
 * By default, the URL slug includes a short random suffix to avoid collisions
 * when multiple posts use the same or similar titles.
 */

import { writeFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { randomBytes } from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const postsDir = join(__dirname, '..', 'src', 'content', 'posts')

function generateSlug(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  return slug || 'untitled-post'
}

function generateShortId(): string {
  return randomBytes(4).toString('hex')
}

function getExistingSlugs(): Set<string> {
  const files = readdirSync(postsDir)
    .filter(f => f.endsWith('.md') && !f.startsWith('.'))
  return new Set(files.map(f => f.replace(/\.md$/, '')))
}

function findUniqueSlug(baseSlug: string, useRandomSuffix: boolean): string {
  const existingSlugs = getExistingSlugs()

  if (useRandomSuffix) {
    for (let attempt = 0; attempt < 10; attempt++) {
      const slug = `${baseSlug}-${generateShortId()}`
      if (!existingSlugs.has(slug)) return slug
    }
    throw new Error('Could not generate a unique random slug after 10 attempts.')
  }

  if (!existingSlugs.has(baseSlug)) return baseSlug

  let counter = 1
  while (existingSlugs.has(`${baseSlug}-${counter}`)) counter++
  return `${baseSlug}-${counter}`
}

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function main() {
  const args = process.argv.slice(2)
  const usePlainUrl = args.includes('--plain-url')
  const titleParts = args.filter(arg => arg !== '--plain-url')

  if (titleParts.length === 0) {
    console.error('Usage: npm run new-post "Post Title"')
    console.error('Optional: npm run new-post -- --plain-url "Post Title"')
    process.exit(1)
  }

  const title = titleParts.join(' ')
  const baseSlug = generateSlug(title)
  const slug = findUniqueSlug(baseSlug, !usePlainUrl)
  const today = formatDate(new Date())

  const content = `---
title: "${title}"
description: ""
date: ${today}
tags: []
# Optional: place optimized images in public/assets/posts/ and reference them like:
# coverImage: "/assets/posts/${slug}.webp"
draft: true
---

- INSERT TEXT HERE -
`

  const filePath = join(postsDir, `${slug}.md`)
  writeFileSync(filePath, content, 'utf-8')

  console.log(`\n✅ Created draft post: ${filePath}`)
  console.log(`   Slug: ${slug}`)
  console.log(`   URL: /posts/${slug}/`)
  console.log(`   Date: ${today}`)
  console.log(`\n🖼️  Optional cover image path:`)
  console.log(`   public/assets/posts/${slug}.webp`)
  console.log(`   Then run: npm run optimize-images`)
  console.log(`\n📝 Edit the file, then set draft: false when ready to publish.`)
  console.log(`   Then run: npm run build && git add ... && git commit && git push\n`)
}

main()
