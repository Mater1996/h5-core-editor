import LbpH5Canvas from 'luban-h5-canvas'
import './styles/index.scss'

const LbpH5Preview = {
  name: 'LubanH5Preview',
  props: {
    h5: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      work: this.h5,
      pageIndex: 0
    }
  },
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
        unit="rem"
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
