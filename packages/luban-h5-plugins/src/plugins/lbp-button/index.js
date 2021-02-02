/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime: 2021-02-02 14:42:31
 * @Description :
 */
// https://github.com/luban-h5-components/plugin-common-props
import PropTypes from 'luban-h5-support'

export default {
  name: 'lbp-button',
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
      text
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
      width: `${this.width}px`,
      height: `${this.height}px`
    }
    return <button style={style}>{text}</button>
  },
  props: {
    width: {
      type: Number,
      default: 120
    },
    height: {
      type: Number,
      default: 40
    },
    text: PropTypes.string(),
    vertical: PropTypes.boolean(),
    fontSize: PropTypes.number({ label: '字号(px)', default: 14 }),
    lineHeight: PropTypes.number({ label: '行高(px)', default: 1 }),
    borderWidth: PropTypes.number({ label: '边框宽度(px)', default: 1 }),
    borderRadius: PropTypes.number({ label: '圆角(px)', default: 4 })
  }
}
