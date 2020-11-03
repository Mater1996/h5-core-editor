/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 14:16:02
 * @LastEditTime : 2020-11-03 17:10:38
 * @Description :
 */
module.exports = {
  publicPath: './',
  chainWebpack: function(config) {
    config.module.rule('js').exclude.add(/luban-h5-editor.js/)
  }
}
