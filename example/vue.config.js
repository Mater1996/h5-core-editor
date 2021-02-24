/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 14:16:02
 * @LastEditTime: 2021-02-24 17:01:52
 * @Description :
 */
module.exports = {
  publicPath: './',
  outputDir: process.env.NODE_ENV === 'production' ? '../docs' : 'dist',
  chainWebpack: function(config) {
    config.module.rule('js').exclude.add(/packages/)
    config.module.rule('eslint').exclude.add(/packages/)
  }
}
