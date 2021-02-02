/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime: 2021-02-02 10:27:48
 * @Description :
 */

import { cloneDeep } from 'lodash'
import Element from './LbpElement'
import lbpPlugins from '../plugins'

export const PAGE = {
  SWIPPER_PAGE: 'h5_swipper',
  LONG_PAGE: 'h5_long_page',
  WIDTH: 375,
  HEIGHT: 667
}

class LbpPage {
  constructor ({
    title = '',
    elements = [],
    height = PAGE.HEIGHT,
    width = PAGE.WIDTH,
    pageMode
  } = {}) {
    this.id = +new Date()
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
        const plugin = lbpPlugins.getPlugin(v.pluginName) || {}
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
    return new LbpPage({
      ...cloneDeep(this),
      elements: this.elements.map(v => v.clone())
    })
  }
}

export default LbpPage
