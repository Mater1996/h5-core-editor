const defaultNumberInputProp = {
  // step: 1,
  // min: 0,
  // max: 144
}

const dataSourceLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24, offset: 0 }
}

export default {
  boolean: ({ label = '开关', defaultValue = false, props = {}, visible = true } = {}) => ({
    type: Boolean,
    default: defaultValue,
    /**
     *
     * !#zh: 是否在属性配置面板显示
     * !#en: whether visible in props config panel
     *
     * 正常情况下都是显示在右侧属性面板中，支持用户配置的
     *
     * 但有些属性是不希望 暴露给用户进行配置的，
     * 比如：editorMode(edit/preview) 当前编辑器模式(编辑模式/预览模式)，
     * 这些是系统注入到组件中，不希望用户进行配置的
     *
     */
    visible,
    editor: {
      type: 'a-switch',
      label,
      props
    },
  }),
  required: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  },
  /**
   * 颜色 默认编辑器
   * Q: 为什么 transparent 无效？
   * A: 注意，根据 MDN 文档，颜色选择器的 value 只能是：# + 6个16进制字符串
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color#Value
   * The value of an <input> element of type color is always a DOMString which contains a 7-character string specifying an RGB color in hexadecimal format.
   *
   */
  color: ({ label = '文字颜色', defaultValue = '#000000', visible = true } = {}) => ({
    type: String,
    // 注意，根据 MDN 文档，颜色选择器的 value 只能是：# + 6个16进制字符串
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color#Value
    // The value of an <input> element of type color is always a DOMString which contains a 7-character string specifying an RGB color in hexadecimal format.
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
      require: true
    },
  }),
  colors: ({ label = '颜色面板', defaultValue = () => [], layout = dataSourceLayout, visible = true } = {}) => ({
    type: Array,
    // 注意，根据 MDN 文档，颜色选择器的 value 只能是：# + 6个16进制字符串
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color#Value
    // The value of an <input> element of type color is always a DOMString which contains a 7-character string specifying an RGB color in hexadecimal format.
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
    },
  }),
  /**
   * 数值类型 默认编辑器
   */
  number: ({ label = '数值', defaultValue = 10, props = defaultNumberInputProp, visible = true } = {}) => ({
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
  string: ({ label = '按钮文字', defaultValue = '按钮', component = 'a-input', props = {}, extra, visible = true } = {}) => ({
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
  textAlign: ({ label = '文字对齐', defaultValue = 'center', visible = true } = {}) => ({
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
    defaultValue = () => [{
      label: 'label1',
      value: 'value1'
    }],
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
  excel: ({ label = '数据源', defaultValue = [], layout = dataSourceLayout, visible = true } = {}) => ({
    type: Array,
    default: defaultValue,
    visible,
    editor: {
      type: 'lbs-excel-editor',
      label,
      layout
    }
  }),
  select: ({ valueType = String, label = '选项', defaultValue = [],  visible = true, options = [] } = {}) => ({
    type: valueType,
    default: defaultValue,
    visible,
    editor: {
      type: 'a-select',
      label,
      props: {
        options,
      }
    }
  }),
}
