/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-12-04 09:35:14
 * @LastEditTime: 2021-01-06 17:30:55
 * @Description :
 */
const execa = require('execa')
const { targets: allTargets } = require('./utils')

async function build (target) {
  const { formats } = target.buildOptions
  for (const i of formats) {
    await execa(
      'rollup',
      [
        '-c',
        './build/rollup.config.js',
        '--environment',
        [
          'NODE_ENV:production',
          `TARGET:${target.name}`,
          `FORMAT:${i}`
        ]
          .filter(Boolean)
          .join(',')
      ],
      { stdio: 'inherit' }
    )
  }
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
