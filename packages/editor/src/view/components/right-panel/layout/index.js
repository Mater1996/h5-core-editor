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
      computedStyle: {},
      color: {
        margin: 'bg-blue-600',
        border: 'bg-blue-500',
        padding: 'bg-blue-400',
        box: 'bg-blue-300'
      }
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
    const { color, value } = this
    return (
      <div class="layout-setting flex justify-center">
        <div class="margin flex flex-col text-center text-xs h-48">
          <div
            class={[
              'margin-bar margin-top flex flex-auto justify-center items-center',
              color.margin
            ]}
          >
            {this._normalizeValue(value.marginTop)}
          </div>
          <div class="flex flex-row flex-auto h-36">
            <div
              class={[
                'margin-bar margin-left flex justify-center items-center min-w-4 h-full p-2',
                color.margin
              ]}
            >
              {this._normalizeValue(value.marginLeft)}
            </div>
            <div class="flex flex-col flex-auto">
              <div
                class={[
                  'border-bar border-top flex flex-auto justify-center items-center',
                  color.border
                ]}
              >
                {this._normalizeValue(value.borderTopWidth)}
              </div>
              <div class="flex flex-row flex-auto h-24">
                <div
                  class={[
                    'border-bar border-left flex justify-center items-center min-w-4 h-full p-2',
                    color.border
                  ]}
                >
                  {this._normalizeValue(value.borderLeftWidth)}
                </div>
                <div class="flex flex-col flex-auto">
                  <div
                    class={[
                      'padding-bar padding-top flex flex-auto justify-center items-center',
                      color.padding
                    ]}
                  >
                    {this._normalizeValue(this.value.paddingTop)}
                  </div>
                  <div class="flex flex-row flex-auto h-12">
                    <div
                      class={[
                        'padding-bar padding-left flex justify-center items-center min-w-4 h-full p-2',
                        color.padding
                      ]}
                    >
                      {this._normalizeValue(this.value.paddingLeft)}
                    </div>
                    <div
                      class={[
                        'box flex flex-auto justify-center items-center min-w-24 h-full',
                        color.box
                      ]}
                    >
                      {`${this._normalizeValue(
                        this.value.width
                      )} x ${this._normalizeValue(this.value.height)}`}
                    </div>
                    <div
                      class={[
                        'padding-bar padding-right flex justify-center items-center min-w-4 h-full p-2',
                        color.padding
                      ]}
                    >
                      {this._normalizeValue(this.value.paddingRight)}
                    </div>
                  </div>
                  <div
                    class={[
                      'padding-bar padding-bottom flex flex-auto justify-center items-center',
                      color.padding
                    ]}
                  >
                    {this._normalizeValue(this.value.paddingBottom)}
                  </div>
                </div>
                <div
                  class={[
                    'border-bar border-right flex justify-center items-center min-w-4 h-full p-2',
                    color.border
                  ]}
                >
                  {this._normalizeValue(value.borderRightWidth)}
                </div>
              </div>
              <div
                class={[
                  'border-bar border-bottom flex flex-auto justify-center items-center ',
                  color.border
                ]}
              >
                {this._normalizeValue(value.borderBottomWidth)}
              </div>
            </div>
            <div
              class={[
                'margin-bar margin-right flex justify-center items-center min-w-4 h-full p-2',
                color.margin
              ]}
            >
              {this._normalizeValue(value.marginRight)}
            </div>
          </div>
          <div
            class={[
              'margin-bar margin-bottom flex flex-auto justify-center items-center',
              color.margin
            ]}
          >
            {this._normalizeValue(value.marginBottom)}
          </div>
        </div>
      </div>
    )
  }
}
