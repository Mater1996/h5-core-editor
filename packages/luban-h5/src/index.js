/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-01-19 10:32:26
 * @Description:
 */
import LubanH5Editor from 'luban-h5-editor'
import { LbpWork, LbpPlugin } from 'luban-h5-core'

export default {
  create (...args) {
    return LbpWork.create(...args)
  },
  plugin: LbpPlugin,
  editor: LubanH5Editor
}

export { LbpWork, LbpPlugin, LubanH5Editor }
