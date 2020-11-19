/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-16 15:12:42
 * @LastEditTime : 2020-11-19 11:03:09
 * @Description :
 */
export default class LbpPlugin {
  constructor ({ name, title, icon, visible, component } = {}) {
    if (!name) return
    this.name = name || component.name
    this.title = title
    this.icon = icon
    this.visible = visible
    this.component = component
  }

  getName () {
    return this.name
  }
}
