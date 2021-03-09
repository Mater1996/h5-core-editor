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
  watch: {
    dataSource: {
      handler (newValue) {
        if (this.codeMirror.getValue() !== this.flushDataSource(newValue)) {
          this.codeMirror.setValue(this.flushDataSource(newValue))
        }
      },
      deep: true
    }
  },
  mounted () {
    setTimeout(() => {
      // TODD: 外部响应
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
      codeMirror.on('update', this._handleCodeChange)
    })
  },
  methods: {
    flushDataSource (data) {
      return JSON.stringify(data, null, '  ')
    },
    _handleCodeChange (e, changeObj) {
      try {
        const value = this.codeMirror
          .getValue()
          .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ')
        const parseValue = JSON.parse(value)
        console.log(parseValue)
        this.$emit('change', parseValue)
      } catch (error) {}
    }
  },
  render () {
    return <div class="data-source h-full"></div>
  }
}
