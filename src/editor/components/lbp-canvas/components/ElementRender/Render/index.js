/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-05 10:04:35
 * @LastEditTime : 2020-11-19 10:29:35
 * @Description :
 */
import pluginsControl from '@/plugins'
import LbpElement from '@/editor/models/LbpElement'

export default {
  props: {
    element: {
      type: LbpElement,
      require: true
    }
  },
  render () {
    const element = this.element
    const component = pluginsControl.getPlugin(element.pluginName).component
    return component ? <component props={element.props}></component> : null
  }
}
