#!/usr/bin/env node
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const assetsDir = path.join(process.cwd(), 'public', 'assets');
const allowed = new Set(['.webp']);
const ignored = new Set(['.DS_Store']);

const invalid: string[] = [];

async function walk(dir: string) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }
    if (ignored.has(entry.name)) continue;
    if (!allowed.has(path.extname(entry.name).toLowerCase())) {
      invalid.push(path.relative(process.cwd(), fullPath));
    }
  }
}

await walk(assetsDir);

if (invalid.length > 0) {
  console.error('Only .webp files are allowed in public/assets:');
  for (const file of invalid) console.error(`- ${file}`);
  process.exit(1);
}
