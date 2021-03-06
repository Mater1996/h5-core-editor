// https://github.com/luban-h5-components/plugin-common-props
import { Input, InputNumber } from '@luban-h5/support'
import {
  addListener as addResizeListener,
  removeListener as removeResizeListener
} from 'resize-detector'
import './index.scss'

function sum (arr = [], key) {
  return arr.map(item => item[key]).reduce((a, b) => a + b, 0)
}

export default {
  name: 'lbp-table',
  data: () => ({
    mainTableWrapperEle: null,
    mainTableEle: null,
    fixedTableWrapperEle: null,
    fixedTableEle: null
  }),
  props: {
    width: {
      default: 120
    },
    height: {
      default: 120
    },
    theme: Input({ label: '主题' }),
    columnWidth: InputNumber({ label: '每列宽度(px)' }),
    freezeCount: InputNumber({ label: '冻结列数(px)' })
  },
  watch: {
    freezeCount () {
      setTimeout(() => {
        this.setFixedTableStyle()
      }, 100)
    }
  },
  render () {
    const renderCell = cell => {
      return (
        <td>
          <div class="cell">{cell}</div>
        </td>
      )
    }

    const renderTable = (tableData = [], tableClass = '', tableStyle = {}) => {
      const headers = tableData.length ? tableData[0] : []
      const columnsCount = headers.length
      return (
        <table class={tableClass} style={tableStyle}>
          <colgroup>
            {[...Array(columnsCount)].map((item, i) => (
              <col style={{ width: this.columnWidth + 'px' }} />
            ))}
          </colgroup>
          <tbody>
            {tableData.map(row => (
              <tr>{row.map(renderCell)}</tr>
            ))}
          </tbody>
        </table>
      )
    }

    return (
      <div class={['lbp-table', this.theme]} ref="lbpTable">
        <div class="main-table-wrapper">{renderTable(this.dataset)}</div>
        <div class="fixed-table-wrapper" v-show="freezeCount">
          {renderTable(this.dataset, 'left-table')}
        </div>
      </div>
    )
  },
  methods: {
    getFixedColsWidth () {
      const tableHeaders = [].slice.apply(
        this.mainTableEle.querySelectorAll('tr:first-child > td')
      )
      const freezeColsWidth = sum(
        tableHeaders.slice(0, +this.freezeCount),
        'offsetWidth'
      )
      return freezeColsWidth
    },
    setFixedTableStyle () {
      this.fixedTableWrapperEle.style.width = `${this.getFixedColsWidth()}px`
      this.fixedTableWrapperEle.style.height = `calc(100% - ${this
        .mainTableWrapperEle.offsetHeight -
        this.mainTableWrapperEle.scrollHeight}px)`
    },
    setTableWidth () {
      const parentWidth = this.$el.parentNode.style.width
      this.fixedTableEle.style.width = this.mainTableEle.style.width = parentWidth
    },
    initElements () {
      const root = this.$el
      this.mainTableWrapperEle = root.querySelector('.main-table-wrapper')
      this.mainTableEle = root.querySelector('.main-table-wrapper > table')
      this.fixedTableWrapperEle = root.querySelector('.fixed-table-wrapper')
      this.fixedTableEle = root.querySelector('.left-table')
    },
    __resizeHandler () {
      this.setTableWidth()
      if (this.freezeCount) {
        this.setFixedTableStyle()
      }
    }
  },

  mounted () {
    this.initElements()
    this.setTableWidth()
    this.setFixedTableStyle()
    addResizeListener(this.$refs.lbpTable, this.__resizeHandler)
  },
  destroy () {
    removeResizeListener(this.$el, this.__resizeHandler)
  }
}
