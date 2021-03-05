/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-13 10:09:46
 * @LastEditTime: 2021-03-05 11:32:21
 * @Description :
 */
import Element from './element'

export default {
  name: 'ElementRender',
  props: {
    elements: {
      type: Array,
      default: () => []
    }
  },
  render () {
    return (
      <div class="element-layer absolute left-0 top-0 right-0 bottom-0 z-0">
        {this.elements.map(element => {
          return <Element element={element}/>
        })}
      </div>
    )
  }
}
