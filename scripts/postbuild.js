const fs = require('fs');
const path = require('path');
const os = require('os');

const cwd = process.cwd();
const platform = os.platform();
const arch = os.arch();

if (platform === 'win32') {
  fs.cpSync(path.join(cwd, `node_modules/@img/sharp-${platform}-${arch}/lib`), path.join(cwd, 'dist'), {
    recursive: true
  });
}

const f = platform === 'win32' ? 'phew.bat' : 'phew.sh';
fs.cpSync(path.join(cwd, `scripts/${f}`), path.join(cwd, `dist/${f}`), { recursive: true });