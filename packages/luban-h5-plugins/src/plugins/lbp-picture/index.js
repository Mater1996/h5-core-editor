/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-27 15:04:59
 * @LastEditTime: 2021-02-02 14:58:48
 * @Description :
 */
import PropTypes from 'luban-h5-support'

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
    imgSrc: PropTypes.string({ label: '图片地址' }),
    fillType: PropTypes.select({
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
