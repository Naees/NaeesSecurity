#!/usr/bin/env node
import { readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const WEBP_QUALITY = 82;
const MIN_ABS_CHANGE = 1024;
const MIN_PCT_CHANGE = 2.5;

const files = process.argv.slice(2)
  .map((file) => path.normalize(file))
  .filter((file) => file.startsWith(`public${path.sep}assets${path.sep}`) && file.toLowerCase().endsWith('.webp'));

if (files.length === 0) {
  process.exit(0);
}

let optimizedCount = 0;
let savedBytes = 0;

for (const file of files) {
  const before = await stat(file).then((stats) => stats.size);
  const input = await readFile(file);
  const output = await sharp(input, { animated: true })
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toBuffer();

  const saved = before - output.length;
  const savedPct = (saved / before) * 100;

  if (saved >= MIN_ABS_CHANGE && savedPct >= MIN_PCT_CHANGE) {
    await writeFile(file, output);
    optimizedCount++;
    savedBytes += saved;
    console.log(`optimized ${file}: saved ${formatBytes(saved)} (${savedPct.toFixed(1)}%)`);
  }
}

if (optimizedCount > 0) {
  console.log(`optimized ${optimizedCount} WebP image(s), saved ${formatBytes(savedBytes)} total`);
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
