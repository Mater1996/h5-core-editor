/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime: 2021-02-25 19:28:48
 * @Description :
 */

import 'tailwindcss/tailwind.css'
import './styles/index.scss'
import LbpH5Editor from './editor'

LbpH5Editor.install = (Vue) => {
  Vue.component(LbpH5Editor.name, LbpH5Editor)
}
if (typeof window !== 'undefined' && window.Vue) {
  LbpH5Editor.install(window.Vue)
}

export default LbpH5Editor
