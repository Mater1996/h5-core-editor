const execa = require('execa')
const { plugins: allPlugins } = require('./utils')

console.log(allPlugins)

async function build (target) {
  await execa(
    'rollup',
    [
      '-c',
      './build/rollup.plugins.config.js',
      '--environment',
      [
        'NODE_ENV:production',
        `TARGET:${target}`
      ]
        .filter(Boolean)
        .join(',')
    ],
    { stdio: 'inherit' }
  )
}

async function buildAll (allPlugins) {
  for (const target of allPlugins) {
    await build(target)
  }
}

async function run () {
  await buildAll(allPlugins)
}

run()
