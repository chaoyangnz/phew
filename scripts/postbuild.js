const fs = require('fs');
const path = require('path');
const os = require('os');

const cwd = process.cwd();
const platform = os.platform();
const arch = os.arch();

if (platform === 'win32') {
  fs.cpSync(path.join(cwd, `node_modules/@img/sharp-${platform}-${arch}/lib/libvips-42.dll`), path.join(cwd, 'dist/libvips-42.dll'), {
    recursive: true
  });
  fs.cpSync(path.join(cwd, `node_modules/@img/sharp-${platform}-${arch}/lib/libvips-cpp.dll`), path.join(cwd, 'dist/libvips-cpp.dll'), {
    recursive: true
  });
}

if (platform === 'darwin') {
  fs.cpSync(
    path.join(cwd, `node_modules/@img/sharp-libvips-${platform}-${arch}/lib/libvips-cpp.42.dylib`),
    path.join(cwd, `dist/libvips-cpp.42.dylib`),
    {
      recursive: true
    }
  );
}

const sh = platform === 'win32' ? 'phew.bat' : 'phew.sh';
fs.cpSync(path.join(cwd, `scripts/${sh}`), path.join(cwd, `dist/${sh}`), { recursive: true });
