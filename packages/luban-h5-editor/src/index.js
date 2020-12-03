/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime : 2020-11-20 09:16:10
 * @Description :
 */
import LpbH5Editor from '@/editor'

LpbH5Editor.install = (Vue, opts = {}) => {
  Vue.component(LpbH5Editor.name, LpbH5Editor)
}
if (typeof window !== 'undefined' && window.Vue) {
  LpbH5Editor.install(window.Vue)
}

export default LpbH5Editor
