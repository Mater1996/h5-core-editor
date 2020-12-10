/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime : 2020-12-04 16:05:44
 * @Description :
 */

import LbpH5Plugin from 'luban-h5-plugins'
import LbpH5Editor from '@/editor'
import LbpH5Canvas from '@/editor/components/lbp-canvas'
import LbpWork from '@/editor/models/LbpWork'

LbpH5Editor.install = (Vue) => {
  Vue.component(LbpH5Editor.name, LbpH5Editor)
}
if (typeof window !== 'undefined' && window.Vue) {
  LbpH5Editor.install(window.Vue)
}

LbpH5Editor.LbpH5Plugin = LbpH5Plugin

export { LbpH5Canvas, LbpWork }
export default LbpH5Editor
