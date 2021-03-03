/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime: 2021-03-03 14:38:16
 * @Description :
 */

import { cloneDeep } from 'lodash'
import Element from './LubanElement'
import lubanPlugins from '../plugins'

export const PAGE = {
  SWIPPER_PAGE: 'h5_swipper',
  LONG_PAGE: 'h5_long_page',
  WIDTH: 375,
  HEIGHT: 667
}

let id = 0
class LubanPage {
  constructor ({
    title = '',
    elements = [],
    height = PAGE.HEIGHT,
    width = PAGE.WIDTH,
    pageMode
  } = {}) {
    this.id = id++
    this.title = title
    this.width = width
    this.height = height
    this.pageMode = pageMode
    this.elements = []
    this.addElement(...elements)
  }

  addElement (...elements) {
    return this.elements.push(
      ...elements.map(v => {
        const plugin = lubanPlugins.getPlugin(v.pluginName) || {}
        return Element.create({
          ...v,
          component: plugin.component
        })
      })
    )
  }

  deleteElement (index) {
    return this.elements.splice(index, 1)
  }

  update (page) {
    Object.assign(this, page)
  }

  clone () {
    return new LubanPage({
      ...cloneDeep(this),
      elements: this.elements.map(v => v.clone())
    })
  }

  static create (...options) {
    return new LubanPage(...options)
  }
}

export default LubanPage
