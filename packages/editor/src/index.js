/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime: 2021-03-03 14:38:29
 * @Description :
 */
import 'normalize.css/normalize.css'
import 'font-awesome/css/font-awesome.min.css'
import 'tailwindcss/tailwind.css'
import './assets/css/index.scss'
import LubanH5Editor from './view'

LubanH5Editor.install = (Vue) => {
  Vue.component(LubanH5Editor.name, LubanH5Editor)
}
if (typeof window !== 'undefined' && window.Vue) {
  LubanH5Editor.install(window.Vue)
}

export default LubanH5Editor
