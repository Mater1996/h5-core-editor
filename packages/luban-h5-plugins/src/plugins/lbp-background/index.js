/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-02-02 16:53:57
 * @Description:
 */

import { string, number } from 'luban-h5-support'

function renderWaterMark ({
  // 使用 ES6 的函数默认值方式设置参数的默认取值
  // 具体参见 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters
  container = document.body,
  width = '100px',
  height = '100px',
  textAlign = 'center',
  textBaseline = 'middle',
  fontSize = 16,
  fillStyle = 'rgba(184, 184, 184, 0.2 )',
  content = '水印文字',
  rotate = 0,
  zIndex = 1000
} = {}) {
  var canvas = document.createElement('canvas')

  canvas.setAttribute('width', width)
  canvas.setAttribute('height', height)
  var ctx = canvas.getContext('2d')

  ctx.textAlign = textAlign
  ctx.textBaseline = textBaseline
  ctx.font = `${fontSize}px Arial`
  ctx.fillStyle = fillStyle
  // ctx.rotate(Math.PI / 180 * rotate);
  ctx.fillText(content, 0, parseFloat(height) / 3)

  var base64Url = canvas.toDataURL()
  const wmEl = document.querySelector('.luban_h5__wm')

  const watermarkDiv = wmEl || document.createElement('div')
  const styleStr = `
    transform: rotate(${rotate}deg);
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:${zIndex};
    pointer-events:none;
    background-repeat:repeat;
    background-image:url('${base64Url}');
    user-select: none`

  watermarkDiv.setAttribute('style', styleStr)

  if (!wmEl) {
    watermarkDiv.classList.add('luban_h5__wm')
    container.style.position = 'relative'
    container.insertBefore(watermarkDiv, container.firstChild)
  }
}

export default {
  name: 'lbp-background',
  props: {
    imgSrc: string({ label: '背景图' }),
    waterMarkText: string({ label: '水印文字' }),
    waterMarkFontSize: number({ label: '水印文水印文字大小(px)' }),
    waterMarkRotate: number({ label: '水印旋转角度' })
  },
  methods: {
    renderWaterMark () {
      renderWaterMark({
        container: this.$refs.root,
        content: this.waterMarkText,
        fontSize: this.waterMarkFontSize,
        rotate: this.waterMarkRotate,
        fillStyle: this.waterMarkColor
      })
    }
  },
  render () {
    let style = {
      width: '100%',
      height: '100%'
    }

    if (this.imgSrc) {
      style = {
        ...style,
        'background-size': 'cover',
        'background-position': '50% 50%',
        'background-origin': 'content-box',
        'background-image': `url(${this.imgSrc})`
      }
    } else {
      style = {
        backgroundColor: this.backgroundColor,
        ...style
      }
    }

    return (
      // [知识点:CSS] : https://codesandbox.io/s/ziyuansuzindexzaigao-wufafugaifuyuansudexiongdiyuansu-n15rd?file=/index.html
      <div
        style="width: 100%; height: 100%; overflow: hidden; position: absolute; z-index: 0; opacity: 1;"
        ref="root"
      >
        <div style={style}></div>
      </div>
    )
  },
  mounted () {
    this.renderWaterMark()
    ;[
      'waterMarkText',
      'waterMarkFontSize',
      'waterMarkRotate',
      'waterMarkColor'
    ].forEach(key => {
      this.$watch(key, this.renderWaterMark)
    })
  }
}
