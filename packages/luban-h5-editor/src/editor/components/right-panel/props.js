export default {
  data: () => ({
    loadCustomEditorFlag: false
  }),
  props: {
    layout: {
      type: String,
      default: 'horizontal'
    },
    config: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    config () {
      // config 需要重新render
      // setTimeout(() => {
      //   this.form.setFieldsValue(this.value)
      // })
    }
  },
  created () {},
  computed: {
    formItemLayout () {
      return this.layout === 'horizontal'
        ? {
          labelCol: { span: 6 },
          wrapperCol: { span: 16, offset: 2 }
        }
        : {}
    }
  },
  methods: {
    renderPropFormItem (propName, propConfig) {
      const { editor } = propConfig
      if (!editor) return
      const formItemData = {
        props: {
          ...this.formItemLayout,
          ...editor.layout,
          label: editor.label
        }
      }
      return (
        <div {...formItemData}>
          <editor.type props={editor.props}></editor.type>
        </div>
      )
    }
  },
  render () {
    const configEntries = Object.entries(this.config)
    console.log(configEntries)
    return (
      <div
        form={this.form}
        size="mini"
        class="props-config-form"
        layout={this.layout}
        initialValue={this.value}
      >
        {configEntries.map(([propName, propConfig]) =>
          this.renderPropFormItem(propName, propConfig)
        )}
      </div>
    )
  }
}
