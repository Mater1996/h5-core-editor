/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-12-03 14:44:21
 * @LastEditTime : 2020-12-03 15:05:38
 * @Description :
 */
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/luban-h5-preview.prod.js')
} else {
  module.exports = require('./dist/luban-h5-preview.js')
}
