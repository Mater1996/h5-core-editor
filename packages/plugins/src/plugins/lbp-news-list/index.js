/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime: 2021-02-02 11:52:39
 * @Description :
 */
import Parser from './excel-parser'
import './index.scss'

export default {
  name: 'lbp-news-list',
  props: {
    width: {
      default: 120
    },
    height: {
      default: 120
    }
  },
  data () {
    return {
      option: {}
    }
  },
  render () {
    /**
     * rows[0] {
        '新闻标题': '',
        '摘要': '',
        '链接': '',
        '日期': '',
        '来源': '',
      }
     */
    const { rows } = Parser.csv2VChartJson(this.dataset)
    return <div class="newslist" style="border-color: transparent;">
      {
        rows.map((item, i) =>
          <div class="news-item">
            <a href={item['链接']} target="_blank" class="link">
              <div class="title">{item['新闻标题']}</div>
            </a>
            <div class="content">{item['摘要']}</div>
            <div class="source">{item['来源']}</div>
            <div class="time">{item['日期']}</div>
          </div>
        )
      }
    </div>
  },
  mounted () {
    // this.renderChart()
  }
}
