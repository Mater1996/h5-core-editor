/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-01-19 10:32:26
 * @Description:
 */
import LubanH5Editor from 'luban-h5-editor'

import LbpWork from './models/LbpWork'
import LbpPage from './models/LbpPage'
import LbpElement from './models/LbpElement'
import LbpPlugin from './plugins'

export default {
  create (...args) {
    return new LbpWork(...args)
  },
  plugin: LbpPlugin
}

export { LbpPlugin, LbpElement, LbpPage, LbpWork, LubanH5Editor }
