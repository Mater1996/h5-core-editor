/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-17 15:56:17
 * @Description :
 */
import NodeWrapper from './components/node-wrapper.js'
/**
 * 预览模块
 * preview h5 work module
 */
export default {
  props: ['data'],
  components: {
    NodeWrapper
  },
  computed: {
    elements () {
      return this.data.elements
    }
  },
  created () {
    console.log(this.data)
  },
  render (h) {
    const pageWrapperStyle = {
      height: this.height || '100%',
      position: 'relative'
    }
    return (
      <div style={pageWrapperStyle}>
        {this.elements.map((element) => (
          <node-wrapper element={element}>
            {h(element.name, element.getPreviewData({ position: 'static' }))}
          </node-wrapper>
        ))}
      </div>
    )
  }
}
