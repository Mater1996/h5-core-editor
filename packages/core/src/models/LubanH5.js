/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-01-20 10:43:41
 * @Description:
 */

import { cloneDeep } from 'lodash'
import LubanPage from './LubanPage'

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

  setData (data) {
    this.data = {
      ...this.data,
      ...data
    }
  }

  addPage (...pages) {
    this.pages.push(...pages.map(v => new LubanPage(v)))
  }

  deletePage (index) {
    return this.pages.splice(index, 1)
  }

  update (work) {
    Object.assign(this, work)
  }

  clone () {
    return new LubanH5({
      ...cloneDeep(this),
      pages: this.pages.map(v => v.clone())
    })
  }

  static create (...options) {
    return new LubanH5(...options)
  }
}

export default LubanH5
