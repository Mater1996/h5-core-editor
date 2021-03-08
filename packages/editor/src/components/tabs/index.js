/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-01-21 10:27:51
 * @Description:
 */
import './index.scss'

import { Tab, Tabs } from 'vue-tabs-component'

const LubanTabs = {
  render () {
    return <Tabs>{this.$slots.default}</Tabs>
  }
}

const LubanTab = {
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  render () {
    return <Tab name={this.name}>{this.$slots.default}</Tab>
  }
}

export { Tab, Tabs }
