/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-12 09:43:23
 * @Description :
 */
import CoreRender from '@/core'
import { PAGE_MODE } from '@/constants/work'
import LbpBackground from '@/plugins/components/lbp-background'

class Page {
  constructor({
    uuid = +new Date(),
    title = '',
    elements = [],
    height = PAGE_MODE.HEIGHT,
    width = PAGE_MODE.WIDTH,
    page_mode = PAGE_MODE.SWIPPER_PAGE
  } = {}) {
    this.uuid = uuid
    this.title = title
    this.width = width >= 0 ? width : PAGE_MODE.WIDTH
    this.height = height >= 0 ? height : PAGE_MODE.HEIGHT
    this.page_mode = page_mode
    this.elements = this.genElements(elements)
  }

  clone() {
    const elements = this.elements.map(
      element => new CoreRender.Element(element)
    )
    return new Page({ title: this.title, elements })
  }

  genElements(elements = []) {
    return Array.isArray(elements) && elements.length > 0
      ? elements.map(v => new CoreRender.Element(v))
      : [new CoreRender.Element(LbpBackground)]
  }
}

export default Page
