/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-17 17:02:27
 * @Description :
 */
import LbpElement from './LbpElement'
import { PAGE_MODE } from '@/constants/work'
import LbpBackground from '@/plugins/components/lbp-background'

class Page {
  constructor ({
    title = '',
    elements = [],
    height = PAGE_MODE.HEIGHT,
    width = PAGE_MODE.WIDTH,
    pageMode = PAGE_MODE.SWIPPER_PAGE
  } = {}) {
    this.id = +new Date()
    this.title = title
    this.width = width >= 0 ? width : PAGE_MODE.WIDTH
    this.height = height >= 0 ? height : PAGE_MODE.HEIGHT
    this.pageMode = pageMode
    this.elements = this.genElements(elements)
  }

  clone () {
    const elements = this.elements.map(element => new LbpElement(element))
    return new Page({ title: this.title, elements })
  }

  genElements (elements = []) {
    return Array.isArray(elements) && elements.length > 0
      ? elements.map(v => new LbpElement(v))
      : [new LbpElement({ name: LbpBackground.name })]
  }
}

export default Page
