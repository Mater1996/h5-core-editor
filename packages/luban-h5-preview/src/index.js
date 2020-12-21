import { LbpH5Canvas, LbpWork } from 'luban-h5-editor'
import './styles/index.scss'

const LbpH5Preview = {
  name: 'lbp-h5-preview',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    work: new LbpWork(this.data || window.__work),
    pageIndex: 0
  }),
  computed: {
    currentPage () {
      const { pages = [] } = this.work
      const currentPage = pages[this.pageIndex] || {}
      return currentPage
    }
  },
  render () {
    return (
      <LbpH5Canvas
        width={this.currentPage.width}
        height={this.currentPage.height}
        elements={this.currentPage.elements}
        readonly
        unit={window.__isRem ? 'rem' : 'px'}
      />
    )
  }
}

LbpH5Preview.install = (Vue, opts = {}) => {
  Vue.component(LbpH5Preview.name, LbpH5Preview)
}
if (typeof window !== 'undefined' && window.Vue) {
  LbpH5Preview.install(window.Vue)
}

export default LbpH5Preview
