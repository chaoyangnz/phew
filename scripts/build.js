const os = require('os');
const path = require('path');

const platform = os.platform();
const arch = os.arch();
const cwd = process.cwd();

const build = Bun.spawnSync(
  [
    'bun',
    'build',
    path.join(cwd, 'src/main.ts'),
    '--compile',
    '--sourcemap',
    '--minify',
    `--target=bun-${platform}-${arch}`,
     ...(platform === 'win32' ? ['--windows-hide-console'] : []),
    // path.join(cwd, 'src/templates/*.tsx'),
    '--outfile',
    path.join(cwd, `dist/${platform === 'win32' ? 'phew.exe' : 'phew'}`)
  ],
  {
    stdio: ['inherit', 'inherit', 'inherit'],
  }
);

if (!build.success) {
  process.exit(1);
}

import { embeddedFiles } from 'bun';

console.log(embeddedFiles); // `icon-${hash}.png`
