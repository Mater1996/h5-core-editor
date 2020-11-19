/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime : 2020-11-19 14:04:17
 * @Description :
 */
import LpbH5Editor from '@/editor'
import LbpH5Preview from '@/editor/preview'

LpbH5Editor.install = (Vue, opts = {}) => {
  Vue.component(LpbH5Editor.name, LpbH5Editor)
}
if (typeof window !== 'undefined' && window.Vue) {
  LpbH5Editor.install(window.Vue)
}

export default LpbH5Editor
export { LbpH5Preview }
