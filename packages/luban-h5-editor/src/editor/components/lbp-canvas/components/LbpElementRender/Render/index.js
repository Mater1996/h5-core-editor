/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-05 10:04:35
 * @LastEditTime : 2020-11-25 18:51:55
 * @Description :
 */
import { cloneDeep } from 'lodash'
import lbpH5Plugins from 'luban-h5-plugins'
import LbpElement from '@/editor/models/LbpElement'

export default {
  props: {
    element: {
      type: LbpElement,
      require: true
    }
  },
  watch: {
    element: {
      handler (newValue) {
        this.trigger('onLbpElementChange', cloneDeep(newValue))
      },
      deep: true
    }
  },
  mounted () {
    this.$lbpPluginEl = this.$refs.lbpPluginEl
  },
  methods: {
    trigger (hookName, data) {
      const hook = this.plugin.component[hookName]
      hook && hook.call(this.$lbpPluginEl, data)
    }
  },
  render () {
    const element = this.element
    const { component } = (this.plugin = lbpH5Plugins.getPlugin(
      element.pluginName
    ))
    return component ? (
      <component ref="lbpPluginEl" props={element.props}></component>
    ) : null
  }
}
