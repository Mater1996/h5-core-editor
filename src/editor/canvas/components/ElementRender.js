/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-05 10:04:35
 * @LastEditTime : 2020-11-10 19:49:16
 * @Description :
 */

import Element from '@/models/element'
import { pluginsMap } from '@/plugins/index'

export default {
  props: {
    element: {
      type: Element,
      require: true
    }
  },
  mounted() {
    this.element.vm = this.$refs['element']
  },
  render(h) {
    const element = this.element
    return h(pluginsMap[element.name], {
      props: element.props,
      ref: 'element'
    })
  }
}
