/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-27 15:04:59
 * @LastEditTime: 2021-02-25 15:33:14
 * @Description :
 */
import { Input, Select } from '@luban-h5/support'

export default {
  name: 'lbp-picture',
  render () {
    return (
      <img
        src={this.imgSrc}
        style={{ objectFit: this.fillType }}
        alt=""
        srcset=""
        width="100%"
      />
    )
  },
  props: {
    imgSrc: Input({ label: '图片地址' }),
    fillType: Select({
      label: '填充方式',
      default: 'contain',
      props: {
        options: [
          { label: 'contain 短边缩放', value: 'contain' },
          { label: 'cover 长边缩放', value: 'cover' },
          { label: 'fill 拉伸', value: 'fill' },
          { label: 'none 原始', value: 'none' },
          { label: 'scale-down 弹性缩放', value: 'scale-down' }
        ]
      }
    })
  }
}
