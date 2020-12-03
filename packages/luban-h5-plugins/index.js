/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-12-03 14:51:49
 * @LastEditTime : 2020-12-03 14:51:50
 * @Description :
 */
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/luban-h5-plugin.prod.js')
} else {
  module.exports = require('./dist/luban-h5-plugin.js')
}
