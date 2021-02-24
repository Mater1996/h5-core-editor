import { Input, Select } from '@luban-h5/support';

/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-27 15:04:59
 * @LastEditTime: 2021-02-24 16:51:15
 * @Description :
 */
var index = {
  name: 'lbp-picture',
  render: function render() {
    var h = arguments[0];
    return h("img", {
      "attrs": {
        "src": this.imgSrc,
        "alt": "",
        "srcset": "",
        "width": "100%"
      },
      "style": {
        objectFit: this.fillType
      }
    });
  },
  props: {
    imgSrc: Input({
      label: '图片地址'
    }),
    fillType: Select({
      label: '填充方式',
      default: 'contain',
      props: {
        options: [{
          label: 'contain 短边缩放',
          value: 'contain'
        }, {
          label: 'cover 长边缩放',
          value: 'cover'
        }, {
          label: 'fill 拉伸',
          value: 'fill'
        }, {
          label: 'none 原始',
          value: 'none'
        }, {
          label: 'scale-down 弹性缩放',
          value: 'scale-down'
        }]
      }
    })
  }
};

export default index;
