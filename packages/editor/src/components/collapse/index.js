/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-03-05 15:32:26
 * @Description:
 */
import './index.scss'
import Item from './item'

export default {
  name: 'FishCollapse',
  Item,
  props: {
    bordered: { type: Boolean, default: false }
  },
  render () {
    return (
      <div class={['fish collapse', { bordered: this.bordered }]}>
        {this.$slots.default}
      </div>
    )
  }
}
