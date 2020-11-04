/*
 * @Author: ly525
 * @Date: 2019-11-24 18:51:58
 * @LastEditors : Please set LastEditors
 * @LastEditTime : 2020-11-04 10:27:29
 * @FilePath: /luban-h5/front-end/h5/src/components/core/models/work.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: work model
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */
import Page from './page.js'
import { PAGE_MODE } from 'core/constants/work'

class Work {
  constructor({
    id,
    title = '标题',
    pages = [],
    description = '描述',
    is_publish,
    is_template,
    height = 667,
    page_mode = PAGE_MODE.SWIPPER_PAGE
  } = {}) {
    this.id = id
    this.title = title
    this.description = description
    this.pages = pages.length > 0 ? pages : [new Page()]
    this.cover_image_url = ''
    this.is_publish = !!is_publish
    this.is_template = false
    this.height = height >= 0 ? height : 667
    this.page_mode = page_mode
  }
}

export default Work
