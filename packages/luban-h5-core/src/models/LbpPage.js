/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime: 2021-01-19 11:11:43
 * @Description :
 */

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
    this.elements = this.genElements(elements)
  }

  clone () {
    const elements = this.elements.map(element => Element.create(element))
    return new LbpPage({ title: this.title, elements })
  }

  genElements (elements = []) {
    console.log(lbpPlugins)
    return Array.isArray(elements) && elements.length > 0
      ? elements.map(v => {
        return Element.create({
          ...v,
          component: lbpPlugins.getPlugin(v.pluginName).component
        })
      })
      : []
  }
}

export default LbpPage
