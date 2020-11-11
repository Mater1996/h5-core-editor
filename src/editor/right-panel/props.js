import '@/styles/props-config-panel.scss'
import {
  Form,
  Tabs,
  Button,
  Radio,
  Input,
  Switch,
  InputNumber,
  Select
} from 'ant-design-vue'
import colorsPanel from '@/support/colors-panel'
import lbsTextAlign from '@/support/text-align'
import lbsExcelEditor from '@/support/excel'
import lbpSlideCustomEditor from '@/plugins/components/lbp-slide__editor'

export default {
  components: {
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [Radio.name]: Radio,
    [Radio.Group.name]: Radio.Group,
    [Radio.Button.name]: Radio.Button,
    [Input.name]: Input,
    [Input.TextArea.name]: Input.TextArea,
    [Switch.name]: Switch,
    [InputNumber.name]: InputNumber,
    [Select.name]: Select,
    colorsPanel,
    lbsTextAlign,
    lbsExcelEditor,
    lbpSlideCustomEditor
  },
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
    config() { // config 需要重新render
      setTimeout(() => {
        this.form.setFieldsValue(this.value)
      })
    }
  },
  created() {
    this.form = this.$form.createForm(this, {
      onFieldsChange: () => {
        this.$emit('change', this.form.getFieldsValue())
      }
    })
  },
  computed: {
    formItemLayout() {
      this.layout === 'horizontal'
        ? {
            labelCol: { span: 6 },
            wrapperCol: { span: 16, offset: 2 }
          }
        : {}
    }
  },
  methods: {
    renderPropFormItem(propName, propConfig) {
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
        <a-form-item {...formItemData}>
          <editor.type
            v-decorator={[propName]}
            props={editor.props}
          ></editor.type>
        </a-form-item>
      )
    }
  },
  render() {
    const configEntries = Object.entries(this.config)
    return (
      <a-form
        form={this.form}
        size="mini"
        class="props-config-form"
        layout={this.layout}
        initialValue={this.value}
      >
        {configEntries.map(([propName, propConfig]) =>
          this.renderPropFormItem(propName, propConfig)
        )}
      </a-form>
    )
  }
}
