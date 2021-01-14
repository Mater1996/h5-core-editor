/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-05 10:04:35
 * @LastEditTime: 2021-01-14 14:15:31
 * @Description :
 * TODO support system-js to async component
 */
import { cloneDeep } from 'lodash'

export default {
  props: {
    element: {
      type: Object,
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
    this.$lbpElement = this.$refs.lbpElement
  },
  methods: {
    trigger (hookName, data) {
      const hook = this.element.getComponent()[hookName]
      hook && hook.call(this.$lbpElement, data)
    }
  },
  render () {
    const { element } = this
    const component = element.getComponent()
    return component ? (
      <component ref="lbpElement" props={element.props}></component>
    ) : null
  }
}
