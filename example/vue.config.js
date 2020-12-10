/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 14:16:02
 * @LastEditTime : 2020-11-17 14:07:27
 * @Description :
 */
module.exports = {
  publicPath: './',
  outputDir: process.env.NODE_ENV === 'production' ? '../docs' : 'dist',
  chainWebpack: function(config) {
    config.module.rule('js').exclude.add(/luban-h5-editor.js/)
    config.module.rule('js').exclude.add(/luban-h5-plugins.js/)
    config.module.rule('eslint').exclude.add(/luban-h5-editor.js/)
    config.module.rule('eslint').exclude.add(/luban-h5-plugins.js/)
  }
}
