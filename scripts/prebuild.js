const os = require('os');
const path = require('path');

const platform = os.platform();
const cwd = process.cwd();

const embed = Bun.spawnSync(['bun', path.join(cwd, 'scripts/embed.js')], {
  stdio: ['inherit', 'inherit', 'inherit']
});

if (!embed.success) {
  process.exit(1);
}

if (platform === 'win32') {
  const patch = Bun.spawnSync(['bun', path.join(cwd, 'scripts/patch.js')], {
    stdio: ['inherit', 'inherit', 'inherit']
  });

  if (!patch.success) {
    process.exit(1);
  }
}
