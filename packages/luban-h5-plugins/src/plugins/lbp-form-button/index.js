/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime: 2021-02-02 14:42:51
 * @Description :
 */
// https://github.com/luban-h5-components/plugin-common-props
import PropTypes from 'luban-h5-support'

export default {
  render () {
    const {
      color,
      textAlign,
      backgroundColor,
      fontSize,
      lineHeight,
      borderColor,
      borderRadius,
      borderWidth,
      text,
      disabled
    } = this

    const style = {
      color,
      textAlign,
      backgroundColor,
      fontSize: fontSize,
      lineHeight: lineHeight + 'em',
      borderColor,
      borderRadius: borderRadius + 'px',
      borderWidth: borderWidth + 'px',
      textDecoration: 'none',
      disabled
    }
    return (
      <button
        style={style}
        onClick={this.handleClick}
      >{text}</button>)
  },
  name: 'lbp-form-button',
  props: {
    text: PropTypes.string(),
    vertical: PropTypes.boolean(),
    fontSize: PropTypes.number({ label: '字号(px)', default: 14 }),
    lineHeight: PropTypes.number({ label: '行高(px)', default: 1 }),
    borderWidth: PropTypes.number({ label: '边框宽度(px)', default: 1 }),
    borderRadius: PropTypes.number({ label: '圆角(px)', default: 4 }),
    disabled: PropTypes.boolean()
  },
  methods: {
    handleClick () {
      if (this.disabled) return

      // #!zh: data-type=lbp-form-input 在 lbp-form-input 组件中定义
      const inputs = document.querySelectorAll("[data-type^='lbp-form-input']")
      if (!inputs.length) return
      const self = this
      const formData = new FormData()
      inputs.forEach(input => formData.append(input.dataset.uuid, input.value))
      const req = new XMLHttpRequest()
      req.onreadystatechange = function () {
        if (req.readyState === 4) {
          const message = req.status === 200 ? '提交成功' : '提交失败'
          self.$message.info(message)
        }
      }
      const workId = window.__work.id
      // TODO #!zh: 可以动态配置表单提交地址
      req.open('post', `/works/form/submit/${workId}`, true)
      req.send(formData)
    }
  }
}
