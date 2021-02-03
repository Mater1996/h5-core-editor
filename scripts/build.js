/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-12-04 09:35:14
 * @LastEditTime: 2021-02-03 10:26:39
 * @Description :
 */
const yargs = require('yargs')
const execa = require('execa')
const argv = yargs(process.argv).argv
const { targets: allTargets, getTarget } = require('./utils')

async function build (target) {
  const {
    buildOptions: { formats = [], name: globalName },
    name
  } = target
  for (let i = 0; i < formats.length; i++) {
    const format = formats[i]
    await execa(
      'rollup',
      [
        '-c',
        './build/rollup.config.js',
        '--environment',
        [
          'NODE_ENV:production',
          `TARGET:${name}`,
          `FORMAT:${format}`,
          `GLOBALNAME:${globalName}`,
          `CLEAR:${i === 0 ? 1 : 0}`
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
  await buildAll(argv.target ? [getTarget(argv.target)] : allTargets)
}

run()
