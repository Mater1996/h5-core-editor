/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-13 10:09:46
 * @LastEditTime: 2021-03-04 16:55:32
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
      <div class="element-layer">
        {this.elements.map(element => {
          return <Element element={element}/>
        })}
      </div>
    )
  }
}
