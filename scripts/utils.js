/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-12-04 09:36:36
 * @LastEditTime: 2021-02-23 17:30:35
 * @Description :
 */
const fs = require('fs')
const path = require('path')

const isDirectory = (p) => fs.statSync(p).isDirectory()
const resolvePackage = (p) => path.resolve('packages', p)
const resolvePlugin = (plugin) => resolvePackage('plugins/src/plugins', plugin)

const getTargetPkg = (target) => {
  if (!isDirectory(resolvePackage(target))) return false
  const pkg = require(resolvePackage(`${target}/package.json`))
  if (pkg.private && !pkg.buildOptions) return false
  return [pkg, target]
}

exports.targets = fs
  .readdirSync(resolvePackage('./'))
  .map(getTargetPkg)
  .filter(Boolean)

exports.plugins = fs
  .readdirSync(resolvePlugin('./'))
  .filter((f) => isDirectory(resolvePlugin(`${f}`)))

exports.getTargetPkg = getTargetPkg
