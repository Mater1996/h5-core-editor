/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-17 16:45:47
 * @Description :
 */
/**
 * 后续学习资料：https://github.com/myliang/x-spreadsheet/issues/159
 */

import Spreadsheet from 'x-data-spreadsheet'
import Parser from './excel-parser'
import CsvImport from '../csv-import'

export default {
  name: 'lbs-excel-editor',
  props: {
    value: {
      type: Array
    },
    formatter: {
      type: Function
    }
  },
  computed: {
    innerItems: {
      get () {
        return Parser.binaryMatrix2excel(this.value)
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    value () {
      this.refreshSheet({ rows: this.innerItems })
    }
  },
  methods: {
    parseCSV (csv) {
      const sheetData = Parser.binaryMatrix2excel(csv.data)
      this.$emit('change', csv.data)
      this.refreshSheet({ rows: sheetData })
    },
    /**
     *
     * @param {Object} data { rows }
     */
    refreshSheet (data) {
      this.sheet.loadData(data)
      this.sheet.reRender()
    },
    initSheet () {
      const ele = this.$refs.excel
      return (
        this.sheet ||
        new Spreadsheet(ele, {
          showToolbar: false,
          showGrid: true,
          showContextmenu: true
          // view: {
          //   height: () => 400,
          //   width: () => ele.getBoundingClientRect().width
          // }
        }).change(excelData => {
          // console.log('----------')
          // console.log(excelData)
          // console.log(this.formatter(excelData))
          // console.log('----------')
          this.$emit('change', this.formatter(excelData) /** BinaryMatrix */)
          // save data to db
        })
      )
    }
  },
  // 注意(看源码)： 如果不调用 data 或 props 的某个值，则 render 不会执行。watcher 的更新时机是什么？？
  render () {
    return (
      <div style="max-height: 320px;overflow:scroll;">
        <div style="line-height:2;">
          <span>
            方案1: <CsvImport onParse={this.parseCSV} />
          </span>
          <span>方案2: 直接编辑 Excel</span>
          <div
            ref="excel"
            style="margin-right: 12px;width: 100%;overflow: scroll"
          ></div>
        </div>
      </div>
    )
  },
  mounted () {
    this.sheet = this.initSheet()
    this.refreshSheet({ rows: this.innerItems })
  }
}
