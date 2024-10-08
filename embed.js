const fs = require('fs');
const path = require('path');

// This file is to manually embeded assets into code
// Bun can also embed assets https://bun.sh/docs/bundler/executables#embed-n-api-addons

async function* walk(dir) {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield entry;
  }
}

async function main() {
  const mime = 'image/png';
  const encoding = 'base64';

  const lines = ['/* WARNING: Generated by embed.js. Do NOT edit this file */\n'];

  lines.push('export const logos = {');
  for await (const p of walk('assets/logo')) {
    const name = path.basename(p);
    console.log(p, name);
    const data = fs.readFileSync(p).toString(encoding);
    const dataUrl = `data:${mime};${encoding},${data}`;
    lines.push(`  '${name}': '${dataUrl}',`);
  }
  lines.push(`} as const`);

  lines.push('export const fonts = {');
  for await (const p of walk('assets/font')) {
    const name = path.basename(p);
    console.log(p, name);
    const data = fs.readFileSync(p).toString('base64');
    lines.push(`  '${name}': Buffer.from('${data}', 'base64'),`);
  }
  lines.push(`} as const`);

  fs.writeFileSync('src/assets.ts', lines.join('\n'), 'utf8');
}

main();
