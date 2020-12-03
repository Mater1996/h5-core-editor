/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-19 11:52:34
 * @LastEditTime : 2020-11-19 11:52:49
 * @Description :
 */
import LbpH5Preview from '@/editor/preview'

LbpH5Preview.install = (Vue, opts = {}) => {
  Vue.component(LbpH5Preview.name, LbpH5Preview)
}
if (typeof window !== 'undefined' && window.Vue) {
  LbpH5Preview.install(window.Vue)
}

export default LbpH5Preview
