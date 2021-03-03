/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-02-04 10:03:30
 * @Description:
 */
import LubanH5Preview from '@luban-h5/preview'
import { LubanH5, LubanPlugin } from '@luban-h5/core'

export const create = (...args) => {
  return LubanH5.create(...args)
}

export { LubanPlugin as plugin, LubanH5Preview as preview }
