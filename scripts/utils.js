/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-12-04 09:36:36
 * @LastEditTime: 2021-01-19 15:26:08
 * @Description :
 */
const fs = require('fs')

exports.targets = fs
  .readdirSync('packages')
  .map(getTarget)
  .filter(Boolean)

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

function getTarget (p) {
  if (!fs.statSync(`packages/${p}`).isDirectory()) {
    return false
  }
  const pkg = require(`../packages/${p}/package.json`)
  if (pkg.private && !pkg.buildOptions) {
    return false
  }
  return pkg
}

exports.getTarget = getTarget
