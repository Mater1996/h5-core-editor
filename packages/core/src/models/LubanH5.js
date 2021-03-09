/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-01-20 10:43:41
 * @Description:
 */

import { cloneDeep } from 'lodash'
import LubanPage from './LubanPage'
import LubanElement from './LubanElement'

let id = 0

class LubanH5 {
  constructor ({
    title = '标题',
    description = '描述',
    pages = []
  } = {}, {
    data = {}
  }) {
    this.id = id++
    this.title = title
    this.description = description
    this.pages = []
    this.data = {}
    this.addPage(...pages)
    this.setData(data)
  }

  /**
   * 设置数据源
   * @param {Object} data
   */
  setData (data) {
    this.data = data
  }

  /**
   * 获取数据源
   * @returns data
   */
  getData () {
    return this.data
  }

  /**
   * 添加page
   * @param  {...LubanPage} pages LubanPage数组
   */
  addPage (...pages) {
    this.pages.push(...pages.map(v => new LubanPage(v)))
  }

  /**
   * 删除页面
   * @param {Number} index page 索引
   * @returns 删除的选项
   */
  deletePage (index) {
    return this.pages.splice(index, 1)
  }

  /**
   * 更新h5数据，例如标题描述等
   * @param {Object}  LubanWork数据
   */
  update ({ title, description }) {
    Object.assign(this, {
      title, description
    })
  }

  /**
   * 更新页面数据
   * @param {LubanPage} page 要更新的页面
   * @param  {...any} options 参数
   */
  updatePage (page, ...options) {
    if (page instanceof LubanPage) {
      page.update(...options)
    }
  }

  /**
   * 更新元素
   * @param {LubanElement} element 要更新的页面
   * @param  {...any} options 参数
   */
  updateElement (element, ...options) {
    if (element instanceof LubanElement) {
      element.update(...options)
    }
  }

  /**
   * 复制一个新的H5
   * @returns LubanH5
   */
  clone () {
    return new LubanH5({
      ...cloneDeep(this),
      pages: this.pages.map(v => v.clone())
    })
  }

  /**
   * 创建一个新的H5
   * @param  {...any} options
   * @returns LubanH5
   */
  static create (...options) {
    return new LubanH5(...options)
  }
}

export default LubanH5
