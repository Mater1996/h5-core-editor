/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime: 2021-01-21 10:05:19
 * @Description :
 */
import './styles/index.scss'
import LbpH5Editor from './editor'

LbpH5Editor.install = (Vue) => {
  Vue.component(LbpH5Editor.name, LbpH5Editor)
}
if (typeof window !== 'undefined' && window.Vue) {
  LbpH5Editor.install(window.Vue)
}

export default LbpH5Editor
