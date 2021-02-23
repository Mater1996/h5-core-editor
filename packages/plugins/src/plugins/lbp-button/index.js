/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime: 2021-02-19 14:07:21
 * @Description :
 */
// https://github.com/luban-h5-components/plugin-common-props
import { Input, InputNumber, Switch } from 'packages/support'

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
    text: Input(),
    vertical: Switch(),
    fontSize: InputNumber({ label: '字号(px)', default: 14 }),
    lineHeight: InputNumber({ label: '行高(px)', default: 1 }),
    borderWidth: InputNumber({ label: '边框宽度(px)', default: 1 }),
    borderRadius: InputNumber({ label: '圆角(px)', default: 4 })
  }
}
