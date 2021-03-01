/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime: 2021-02-26 10:17:53
 * @Description :
 */
import 'normalize.css/normalize.css'
import 'font-awesome/css/font-awesome.min.css'
import 'tailwindcss/tailwind.css'
import './assets/css/index.scss'
import LbpH5Editor from './view'

LbpH5Editor.install = (Vue) => {
  Vue.component(LbpH5Editor.name, LbpH5Editor)
}
if (typeof window !== 'undefined' && window.Vue) {
  LbpH5Editor.install(window.Vue)
}

export default LbpH5Editor
