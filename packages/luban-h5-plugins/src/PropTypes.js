import Select from 'ant-design-vue/lib/select'
import 'ant-design-vue/lib/select/style/css'
import Switch from 'ant-design-vue/lib/switch'
import 'ant-design-vue/lib/switch/style/css'
import Input from 'ant-design-vue/lib/input'
import 'ant-design-vue/lib/input/style/css'

const dataSourceLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24, offset: 0 }
}

export default {
  boolean: ({
    label = '开关',
    defaultValue = false,
    props = {},
    visible = true
  } = {}) => ({
    type: Boolean,
    default: defaultValue,
    visible,
    editor: {
      type: Switch,
      label,
      props
    }
  }),
  required: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  },
  color: ({
    label = '文字颜色',
    defaultValue = '#000000',
    visible = true
  } = {}) => ({
    type: String,
    default: defaultValue,
    visible,
    editor: {
      type: 'colors-panel',
      label,
      props: {
        size: 'mini',
        showAlpha: true
      },
      require: true
    }
  }),
  colors: ({
    label = '颜色面板',
    defaultValue = () => [],
    layout = dataSourceLayout,
    visible = true
  } = {}) => ({
    type: Array,
    default: defaultValue,
    visible,
    editor: {
      type: 'colors-panel',
      label,
      // !#zh 为编辑组件指定 props
      props: {
        size: 'mini',
        showAlpha: true
      },
      layout,
      require: true
    }
  }),
  /**
   * 数值类型 默认编辑器
   */
  number: ({
    label = '数值',
    defaultValue = 10,
    props = {},
    visible = true
  } = {}) => ({
    type: Number,
    default: defaultValue,
    visible,
    editor: {
      type: 'a-input-number',
      label,
      require: true,
      props
    }
  }),
  /**
   * 文本类型 默认编辑器
   *
   * component 可以采用
   * 1. a-input
   * 2. a-textarea
   * 3. 富文本编辑器
   */
  string: ({
    label = '按钮文字',
    defaultValue = '按钮',
    component = Input,
    props = {},
    extra,
    visible = true
  } = {}) => ({
    type: String,
    default: defaultValue,
    visible,
    editor: {
      type: component,
      label,
      require: true,
      props,
      extra
    }
  }),
  textAlign: ({
    label = '文字对齐',
    defaultValue = 'center',
    visible = true
  } = {}) => ({
    type: String,
    default: defaultValue,
    visible,
    editor: {
      type: 'lbs-text-align',
      label,
      require: true
    }
  }),
  textOptions: ({
    label = '选项列表',
    defaultValue = () => [
      {
        label: 'label1',
        value: 'value1'
      }
    ],
    visible = true
  } = {}) => ({
    type: Array,
    default: defaultValue,
    visible,
    editor: {
      type: 'lbs-props-text-enum-editor',
      label,
      require: true
    }
  }),
  image: ({ label = '图片', defaultValue = '', visible = true } = {}) => ({
    type: String,
    default: defaultValue,
    visible,
    editor: {
      type: 'lbs-image-gallery',
      label
    }
  }),
  /**
   * 数据源组件
   */
  excel: ({
    label = '数据源',
    defaultValue = [],
    layout = dataSourceLayout,
    visible = true
  } = {}) => ({
    type: Array,
    default: defaultValue,
    visible,
    editor: {
      type: 'lbs-excel-editor',
      label,
      layout
    }
  }),
  select: ({
    valueType = String,
    label = '选项',
    defaultValue = '',
    visible = true,
    options = []
  } = {}) => ({
    type: valueType,
    default: defaultValue,
    visible,
    editor: {
      type: Select,
      label,
      props: {
        options
      }
    }
  })
}
