/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-11 19:49:19
 * @LastEditTime : 2020-11-12 09:32:42
 * @Description :
 */
export default class LbpPlugin {
  constructor({ name, i18nTitle = {}, title, icon, visible, component } = {}) {
    this.name = name
    this.i18nTitle = i18nTitle
    this.title = title
    this.icon = icon
    this.visible = visible
    this.component = component
  }
}
