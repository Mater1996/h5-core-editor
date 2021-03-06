// https://github.com/luban-h5-components/plugin-common-props
import { Select, Input, Switch, InputNumber } from '@luban-h5/support'
const typeOptions = [
  {
    label: '文字',
    value: 'text'
  },
  {
    label: '密码',
    value: 'password'
  },
  {
    label: '日期',
    value: 'date'
  },
  {
    label: '邮箱',
    value: 'email'
  },
  {
    label: '手机号',
    value: 'tel'
  }
]

export default {
  name: 'lbp-form-input',
  render (h) {
    const style = {
      color: this.color,
      textAlign: this.textAlign,
      backgroundColor: this.backgroundColor,
      fontSize: this.fontSize + 'px',
      lineHeight: this.lineHeight + 'em',
      borderColor: this.borderColor,
      borderRadius: this.borderRadius + 'px',
      borderWidth: this.borderWidth + 'px',
      padding: '0 5px'
    }
    return <input
      disabled={this.disabled}
      type={this.type}
      style={style}
      name={this.name}
      placeholder={this.placeholder}
      autocomplete="off"
      data-type="lbp-form-input" // 点击[表单提交]按钮的时候,找到data-type为:lbp-form-input 的输入框，并将其值添加到formData,提交到后台
    />
  },
  props: {
    type: Select({ label: '类型', props: { options: typeOptions } }),
    name: Input({ label: 'name' }),
    disabled: Switch({ label: 'disabled' }),
    fontSize: InputNumber({ label: '字号(px)' }),
    placeholder: Input({ label: '提示信息' }),
    borderWidth: InputNumber({ label: '边框宽度(px)' }),
    borderRadius: InputNumber({ label: '圆角(px)' }),
    vertical: Switch(),
    lineHeight: InputNumber({ label: '行高(px)' })
  }
}

// .lb-plugin__input {
//   display: block;
//   margin: 0;
//   padding: 0 5px;
//   box-sizing: border-box;
//   overflow: visible;
//   border: 1px solid #ced4da;
//   &:focus {
//     outline: none;
//   }
// }
