/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-01-19 10:32:26
 * @Description:
 */
import LubanH5Editor from '@luban-h5/editor'
import { LubanH5, LubanPlugin } from '@luban-h5/core'

export default {
  create (...args) {
    return LubanH5.create(...args)
  },
  plugin: LubanPlugin,
  editor: LubanH5Editor
}

export { LubanH5, LubanH5Editor }
