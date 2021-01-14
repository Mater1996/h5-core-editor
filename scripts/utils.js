/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-12-04 09:36:36
 * @LastEditTime: 2021-01-06 11:23:44
 * @Description :
 */
const fs = require('fs')

exports.targets = fs.readdirSync('packages').map(f => {
  if (!fs.statSync(`packages/${f}`).isDirectory()) {
    return false
  }
  const pkg = require(`../packages/${f}/package.json`)
  if (pkg.private && !pkg.buildOptions) {
    return false
  }
  return pkg
}).filter(Boolean)

exports.plugins = fs
  .readdirSync('packages/luban-h5-plugins/src/plugins')
  .filter(f => {
    if (
      !fs.statSync(`packages/luban-h5-plugins/src/plugins/${f}`).isDirectory()
    ) {
      return false
    }
    return true
  })
