/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-12-04 09:35:14
 * @LastEditTime: 2021-02-03 15:09:50
 * @Description :
 */
const yargs = require('yargs')
const execa = require('execa')
const argv = yargs(process.argv).argv
const { targets: allTargets, getTarget } = require('./utils')
const { Array } = require('core-js')

async function build (target) {
  let { buildOptions, name } = target
  buildOptions = Array.isArray(buildOptions) ? buildOptions : [buildOptions]
  let clear = true
  for (const buildOption of buildOptions) {
    const { formats = [], name: globalName, input = 'src/index.js' } = buildOption
    for (const format of formats) {
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
            `INPUT:${input}`,
            `CLEAR:${clear ? 1 : 0}`
          ]
            .filter(Boolean)
            .join(',')
        ],
        { stdio: 'inherit' }
      )
      clear = false
    }
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
