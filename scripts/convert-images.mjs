import sharp from 'sharp';
import { readdir, unlink, rename } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const PUBLIC = './public';

const conversions = [
  { from: 'Sellauto.jpg',                     to: 'sellauto.webp' },
  { from: 'kamitra.jpg.png',                   to: 'kamitra.webp' },
  { from: 'juodassmelis.jpg',                  to: 'juodassmelis.webp' },
  { from: 'nature.jpg',                        to: 'nature.webp' },
  { from: 'camera.jpg',                        to: 'camera.webp' },
  { from: 'city.jpg',                          to: 'city.webp' },
  { from: 'coolblur.jpg',                      to: 'coolblur.webp' },
  { from: 'flower.jpg',                        to: 'flower.webp' },
  { from: 'photostudio.jpg',                   to: 'photostudio.webp' },
  { from: 'VSR Statyba logo.png',              to: 'vsr-statyba-logo.webp' },
  { from: 'greenaslogo-removebg-preview.png',  to: 'greenas-logo.webp' },
  { from: 'White.png',                         to: 'white-logo.webp' },
  { from: 'kamitra ir ko logo.webp',           to: 'kamitra-ir-ko-logo.webp' },
  { from: 'artvomit logo.webp',                to: 'artvomit-logo.webp' },
  { from: 'sell-autologo1.webp',               to: 'sellaut-logo.webp' },
];

let converted = 0;
let renamed = 0;
let skipped = 0;

for (const { from, to } of conversions) {
  const src = path.join(PUBLIC, from);
  const dst = path.join(PUBLIC, to);

  if (!existsSync(src)) {
    console.log(`⚠ not found: ${from}`);
    skipped++;
    continue;
  }

  if (from === to) {
    console.log(`✓ skip (same name): ${from}`);
    skipped++;
    continue;
  }

  // For .webp → .webp renames (no re-encode needed), just copy with sharp to clean metadata
  const ext = path.extname(from).toLowerCase();
  const alreadyWebp = ext === '.webp';

  try {
    if (alreadyWebp) {
      await sharp(src).webp({ quality: 85 }).toFile(dst);
      renamed++;
    } else {
      await sharp(src).webp({ quality: 85 }).toFile(dst);
      converted++;
    }
    console.log(`✓ ${from} → ${to}`);
    await unlink(src);
  } catch (e) {
    console.error(`✗ ${from}: ${e.message}`);
  }
}

console.log(`\nDone. Converted: ${converted}, Renamed: ${renamed}, Skipped: ${skipped}`);
