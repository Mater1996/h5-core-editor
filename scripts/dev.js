/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-12-04 09:17:12
 * @LastEditTime : 2020-12-04 09:25:39
 * @Description :
 */

const execa = require('execa')
const target = 'luban-h5-editor'

execa(
  'rollup',
  [
    '-wc',
    './build/rollup.config.js',
    '--environment',
    [
      `TARGET:${target}`
    ]
      .filter(Boolean)
      .join(',')
  ],
  {
    stdio: 'inherit'
  }
)
