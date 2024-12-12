const fs = require('fs')
const path = require('path')
const os = require('os')

const cwd = process.cwd()
const platform = os.platform()

if (platform === 'win32') {
  fs.cpSync(
    path.join(cwd, 'node_modules/@img/sharp-win32-x64/lib'),
    path.join(cwd, 'dist'),
    { recursive: true }
  )
}
