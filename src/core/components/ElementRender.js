/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-05 10:04:35
 * @LastEditTime : 2020-11-12 09:28:11
 * @Description :
 */

import Element from '@/core/models/element'
import pluginsControl from '@/plugins'

export default {
  props: {
    element: {
      type: Element,
      require: true
    }
  },
  created() {
    this.element.vm = this
  },
  render(h) {
    const element = this.element
    const component = pluginsControl.getPlugin(element.name).component
    return h(component, {
      props: element.props
    })
  }
}
