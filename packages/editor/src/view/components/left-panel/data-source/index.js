/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-03-08 14:09:27
 * @Description: 数据源编辑器,编辑与组建有关的响应式数据
 */
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

export default {
  name: 'DataSourceSetting',
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {
    setTimeout(() => {
      const codeMirror = (this.codeMirror = CodeMirror(
        document.querySelector('.data-source'),
        {
          value: this.flushDataSource(this.dataSource),
          mode: 'javascript',
          lineWrapping: true,
          tabSize: 2,
          theme: 'material',
          lint: true
        }
      ))
      codeMirror.on('change', this._handleCodeChange)
    })
  },
  methods: {
    flushDataSource (dataSource) {
      return JSON.stringify(dataSource, null, '  ')
    },
    _handleCodeChange (e, changeObj) {
      try {
        const value = this.codeMirror
          .getValue()
          .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ')
        this.$emit('change', JSON.parse(value))
      } catch (error) {

      }
    }
  },
  render () {
    return <div class="data-source h-full"></div>
  }
}
