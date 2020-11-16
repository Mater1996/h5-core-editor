/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-16 15:12:42
 * @LastEditTime : 2020-11-16 15:12:49
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
