/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-05 10:04:35
 * @LastEditTime : 2020-11-17 13:40:39
 * @Description :
 */
import pluginsControl from '@/plugins'

export default {
  props: {
    elName: {
      type: String,
      require: true
    },
    elProps: {
      type: Object,
      require: true
    }
  },
  render () {
    const component = pluginsControl.getPlugin(this.elName).component
    return <component props={this.elProps}></component>
  }
}
