/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-12-04 09:17:12
 * @LastEditTime: 2021-01-20 10:09:07
 * @Description :
 */

const yargs = require('yargs')
const execa = require('execa')
const argv = yargs(process.argv).argv

execa(
  'rollup',
  [
    '-wc',
    './build/rollup.config.js',
    '--environment',
    [
      `TARGET:${argv.target}`,
      `FORMAT:${'esm'}`
    ]
      .filter(Boolean)
      .join(',')
  ],
  {
    stdio: 'inherit'
  }
)
