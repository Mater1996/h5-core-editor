/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime : 2020-11-19 14:35:14
 * @Description :
 */
import 'ant-design-vue/dist/antd.css'
import { Layout } from 'ant-design-vue'

import '@/styles/index.scss'
import '@/plugins'

import LbpCanvas from './components/lbp-canvas'
import LbpWork from './models/LbpWork'

const LbpH5Preview = {
  name: 'lbp-h5-preview',
  components: {
    [Layout.name]: Layout,
    [Layout.Content.name]: Layout
  },
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data: () => ({
    work: {},
    pageIndex: 0
  }),
  computed: {
    currentPage () {
      const { pages = [] } = this.work
      const currentPage = pages[this.pageIndex] || {}
      return currentPage
    }
  },
  watch: {
    data: {
      handler (data = {}) {
        this.work = new LbpWork(data)
        console.log(this.work)
      },
      immediate: true
    }
  },
  render () {
    return (
      <LbpCanvas
        width={this.currentPage.width}
        height={this.currentPage.height}
        elements={this.currentPage.elements}
        readonly
      />
    )
  }
}

export default LbpH5Preview
