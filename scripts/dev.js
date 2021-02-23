/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-12-04 09:17:12
 * @LastEditTime: 2021-02-19 12:03:21
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
      'NODE_ENV:development',
      `TARGET:${argv.target}`,
      `FORMAT:${'esm'}`,
      'INPUT:src/index.js',
      'OUTPUT:dist'
    ]
      .filter(Boolean)
      .join(',')
  ],
  {
    stdio: 'inherit'
  }
)
