/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-01-20 10:43:41
 * @Description:
 */

import { cloneDeep } from 'lodash'
import LbpPage from './LbpPage'

class LbpWork {
  constructor ({
    id,
    title = '标题',
    description = '描述',
    pages = [],
    isPublish,
    isTemplate
  } = {}) {
    this.id = id
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
    return new LbpWork({
      ...cloneDeep(this),
      pages: this.pages.map(v => v.clone())
    })
  }
}

export default LbpWork
