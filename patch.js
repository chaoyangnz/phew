const fs = require('fs')

const file = 'node_modules/sharp/lib/sharp.js'
const additionalPath = '`./sharp-${runtimePlatform}.node`'

let js = fs.readFileSync(file, 'utf8')

// This script is to patch sharp.js so that it requires pre-compiled .node
// If it dynamically requires .node files, bun will NOT bundle it
// refer to https://bun.sh/docs/bundler/executables#embed-n-api-addons

if (!js.includes(additionalPath)) {
    js = js.replace('let sharp;', `let sharp = require('@img/sharp-win32-x64/sharp.node');`)

    fs.writeFileSync(file, js)
}

