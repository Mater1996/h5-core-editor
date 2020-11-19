/*
 * @Author: ly525
 * @Date: 2019-11-24 18:51:58
 * @LastEditors : Please set LastEditors
 * @LastEditTime : 2020-11-17 17:02:05
 * @FilePath: /luban-h5/front-end/h5/src/components/@/models/work.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: work model
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */
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
    this.pages = this.genPages(pages)
    this.cover_image_url = ''
    this.is_publish = !!isPublish
    this.is_template = !!isTemplate
  }

  genPages (pages) {
    return Array.isArray(pages) && pages.length > 0
      ? pages.map(v => new LbpPage(v))
      : [new LbpPage()]
  }
}

export default LbpWork
