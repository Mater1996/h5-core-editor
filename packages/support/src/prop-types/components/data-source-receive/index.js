/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-03-08 10:04:52
 * @Description: 订阅数据源接收属性 例如 value: DataSource()
 * 那么订阅数据会被传入到value上，一个组件只有一个订阅数据接收属性
 */

export default {
  name: 'LubanSupportDataSourceReceive',
  props: {
    value: {
      type: String
    }
  },
  render () {
    return <p>{this.value}</p>
  }
}
