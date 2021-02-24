/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-12-04 09:35:14
 * @LastEditTime: 2021-02-23 17:37:38
 * @Description :
 */
const yargs = require('yargs')
const execa = require('execa')
const argv = yargs(process.argv).argv
const { targets: allTargets, getTargetPkg } = require('./utils')

async function build ([targetPkg, target]) {
  const { buildOptions } = targetPkg
  let clear = true
  for (const buildOption of buildOptions) {
    const {
      formats = [],
      name: globalName,
      input = 'src/index.js',
      output = 'dist'
    } = buildOption
    for (const format of formats) {
      await execaRollup([
        'NODE_ENV:production',
        `TARGET:${target}`,
        `FORMAT:${format}`,
        `GLOBALNAME:${globalName}`,
        `INPUT:${input}`,
        `CLEAR:${clear ? 1 : 0}`,
        `OUTPUT:${output}`
      ])
      clear = false
    }
  }
}

const execaRollup = (options) => {
  return execa(
    'rollup',
    ['-c', './build/rollup.config.js', '--environment', options.join(',')],
    { stdio: 'inherit' }
  )
}

async function buildAll (targets) {
  for (const target of targets) {
    await build(target)
  }
}

async function run () {
  await buildAll(argv.target ? [getTargetPkg(argv.target)] : allTargets)
}

run()
