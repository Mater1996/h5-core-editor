/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-01-21 14:31:13
 * @Description:
 */
export default {
  name: 'LayoutSetting',
  props: {
    element: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Object,
      default: () => ({
        borderLeftWidth: 100
      })
    }
  },
  data () {
    return {
      computedStyle: {}
    }
  },
  methods: {
    _handleMarginTopChange (e) {
      this.$emit('change', {
        ...this.value,
        marginTop: Number(e.target.value)
      })
    },
    _normalizeValue (value) {
      return value || '-'
    }
  },
  watch: {
    value () {
      const { __shape__ } = this.element || {}
      if (__shape__) {
        this.computedStyle = window.getComputedStyle(__shape__.$el)
      }
    }
  },
  render () {
    return (
      <div class="layout-setting flex justify-center">
        <div class="margin flex flex-col text-center text-xs w-48 h-42">
          <div class="margin-bar margin-top flex justify-center items-center bg-yellow-400 w-full h-4">
            {this._normalizeValue(this.value.marginTop)}
          </div>
          <div class="flex flex-row flex-auto h-28">
            <div class="margin-bar margin-left flex justify-center items-center bg-yellow-400 w-4 h-full">
              {this._normalizeValue(this.value.marginLeft)}
            </div>
            <div class="flex flex-col flex-auto">
              <div class="border-bar border-top flex justify-center items-center bg-yellow-600 w-full h-4">
                {this._normalizeValue(this.value.borderTopWidth)}
              </div>
              <div class="flex flex-row flex-auto h-20">
                <div class="border-bar border-left flex justify-center items-center bg-yellow-600 w-4 h-full">
                  {this._normalizeValue(this.value.borderLeftWidth)}
                </div>
                <div class="flex flex-col flex-auto">
                  <div class="padding-bar padding-top flex justify-center items-center bg-yellow-800 w-full h-4">
                    {this._normalizeValue(this.value.paddingTop)}
                  </div>
                  <div class="flex flex-row flex-auto h-12">
                    <div class="padding-bar padding-left flex justify-center items-center bg-yellow-800 w-4 h-full">
                      {this._normalizeValue(this.value.paddingLeft)}
                    </div>
                    <div class="box flex flex-auto justify-center items-center bg-yellow-900 w-full h-full">
                      {`${this._normalizeValue(
                        this.value.width
                      )} x ${this._normalizeValue(this.value.height)}`}
                    </div>
                    <div class="padding-bar padding-right flex justify-center items-center bg-yellow-800 w-4 h-full ">
                      {this._normalizeValue(this.value.paddingRight)}
                    </div>
                  </div>
                  <div class="padding-bar padding-bottom flex justify-center items-center bg-yellow-800 w-full h-4 ">
                    {this._normalizeValue(this.value.paddingBottom)}
                  </div>
                </div>
                <div class="border-bar border-right flex justify-center items-center bg-yellow-600 w-4 h-full">
                  {this._normalizeValue(this.value.borderRightWidth)}
                </div>
              </div>
              <div class="border-bar border-bottom flex justify-center items-center bg-yellow-600 w-full h-4">
                {this._normalizeValue(this.value.borderBottomWidth)}
              </div>
            </div>
            <div class="margin-bar margin-right flex justify-center items-center bg-yellow-400 w-4 h-full">
              {this._normalizeValue(this.value.marginRight)}
            </div>
          </div>
          <div class="margin-bar margin-bottom flex justify-center items-center bg-yellow-400 w-full h-4">
            {this._normalizeValue(this.value.marginBottom)}
          </div>
        </div>
      </div>
    )
  }
}
