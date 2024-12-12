const os = require('os')
const path = require('path')

const platform = os.platform()
const cwd = process.cwd()

const build = Bun.spawnSync(
  [
    'bun',
    'build',
    path.join(cwd, 'src/main.ts'),
    '--compile',
    '--outfile',
    path.join(cwd, `dist/${platform === 'win32' ? 'phew.exe' : 'phew'}`),
  ],
  {
    stdio: ['inherit', 'inherit', 'inherit'],
  }
)

if (!build.success) {
  process.exit(1)
}
