/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 14:16:02
 * @LastEditTime : 2020-11-03 15:29:24
 * @Description :
 */
module.exports = {
  chainWebpack: function(config) {
    config.module
      .rule("js")
      .exclude.add(/luban-h5-editor.js/);
  }
};
