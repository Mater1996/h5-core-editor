/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-01-21 14:31:13
 * @Description:
 */
export default {
  name: 'LayoutSetting',
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    _handleMarginTopChange (e) {
      this.$emit('change', {
        ...this.value,
        marginTop: Number(e.target.value)
      })
    }
  },
  render () {
    return (
      <div class="layout-setting">
        <div class="margin" style={{ fontSize: 0 }}>
          <div class="margin-bar margin-top bg-yellow-400"></div>
          <div class="margin-bar margin-left bg-yellow-400 inline-block"></div>
          <div class="border">
            <div class="border-bar border-top bg-yellow-600"></div>
            <div class="border-bar border-left bg-yellow-600 inline-block"></div>
            <div class="padding">
              <div class="padding-bar padding-top bg-yellow-800"></div>
              <div class="padding-bar padding-left bg-yellow-800"></div>
              <div class="box bg-yellow-900"></div>
              <div class="padding-bar padding-right bg-yellow-800 inline-block"></div>
              <div class="padding-bar padding-bottom bg-yellow-800"></div>
            </div>
            <div class="border-bar border-right bg-yellow-600 inline-block"></div>
            <div class="border-bar border-bottom bg-yellow-600"></div>
          </div>
          <div class="margin-bar margin-right bg-yellow-400 inline-block"></div>
          <div class="margin-bar margin-bottom bg-yellow-400"></div>
        </div>
      </div>
    )
  }
}
