/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime : 2020-11-20 11:36:21
 * @Description :
 */
import '@/styles/index.scss'
import '@/plugins'

import LbpCanvas from './components/lbp-canvas'
import LbpWork from './models/LbpWork'

const LbpH5Preview = {
  name: 'lbp-h5-preview',
  data: () => ({
    work: new LbpWork(window.__work),
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
