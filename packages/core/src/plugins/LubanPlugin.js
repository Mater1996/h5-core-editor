/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-16 15:12:42
 * @LastEditTime: 2021-03-03 14:33:39
 * @Description :
 */
export default class LubanPlugin {
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
