/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-12-04 09:35:14
 * @LastEditTime : 2020-12-04 09:48:08
 * @Description :
 */
const execa = require('execa')
const { targets: allTargets } = require('./utils')

async function build (target) {
  await execa(
    'rollup',
    [
      '-c',
      './build/rollup.config.js',
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

async function buildAll (targets) {
  for (const target of targets) {
    await build(target)
  }
}

async function run () {
  await buildAll(allTargets)
}

run()
