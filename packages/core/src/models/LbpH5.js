/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-01-20 10:43:41
 * @Description:
 */

import { cloneDeep } from 'lodash'
import LbpPage from './LbpPage'

let id = 0

class LbpH5 {
  constructor ({
    title = '标题',
    description = '描述',
    pages = [],
    isPublish,
    isTemplate
  } = {}) {
    this.id = id++
    this.title = title
    this.description = description
    this.pages = []
    this.cover_image_url = ''
    this.is_publish = !!isPublish
    this.is_template = !!isTemplate
    this.addPage(...pages)
  }

  addPage (...pages) {
    this.pages.push(...pages.map(v => new LbpPage(v)))
  }

  deletePage (index) {
    return this.pages.splice(index, 1)
  }

  update (work) {
    Object.assign(this, work)
  }

  clone () {
    return new LbpH5({
      ...cloneDeep(this),
      pages: this.pages.map(v => v.clone())
    })
  }

  static create (...options) {
    return new LbpH5(...options)
  }
}

export default LbpH5
