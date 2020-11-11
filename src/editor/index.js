/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime : 2020-11-11 10:29:53
 * @Description :
 */
import 'animate.css/animate.css'
import 'font-awesome/css/font-awesome.min.css'
import 'ant-design-vue/dist/antd.css'
import { Layout } from 'ant-design-vue'

import '@/styles/index.scss'
import FixedTools from '@/editor/fixed-tools/index'
import EditorRightPanel from '@/editor/right-panel/index'
import EditorCanvas from '@/editor/canvas'
import EditorLeftPanel from '@/editor/left-panel/index'
import AdjustLineV from '@/support/adjust-line/vertical'
import store from '@/store/index'
import i18n from '@/locales/index'
import '@/plugins/index'
import Work from '@/models/work'

const CoreEditor = {
  name: 'CoreEditor',
  components: {
    [Layout.name]: Layout
  },
  store,
  i18n,
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data: () => ({
    work: {},
    pageIndex: 0,
    propsPanelWidth: 375,
    activeElement: null
  }),
  watch: {
    data: {
      handler(data) {
        this.work = new Work(data)
      },
      immediate: true
    }
  },
  computed: {
    currentPage() {
      const { pages = [] } = this.work
      return pages[this.pageIndex]
    }
  },
  methods: {
    getData() {
      return this.$store.state.editor.work
    },
    handleElementActive(element) {
      this.activeElement = element
    },
    handleElementDeactive(deactiveElement) {
      if (deactiveElement === this.activeElement) {
        this.activeElement = null
      }
    },
    handlePropsChange(value) {
      this.$refs['editor'].updateActiveElement(value)
    },
    handleAddElement({ component }) {
      this.$refs['editor'].addElement(component)
    }
  },
  render() {
    return (
      <a-layout>
        <a-layout style={{ height: '100%' }}>
          <EditorLeftPanel onAdd={this.handleAddElement} />
          <EditorCanvas
            ref="editor"
            data={this.currentPage}
            onActive={this.handleElementActive}
            onDeactive={this.handleElementDeactive}
          />
          <AdjustLineV
            onLineMove={offset => {
              this.propsPanelWidth += offset
            }}
          />
          <FixedTools />
          <EditorRightPanel
            width={this.propsPanelWidth}
            element={this.activeElement}
            onPropsChange={this.handlePropsChange}
          />
        </a-layout>
      </a-layout>
    )
  }
}

export default CoreEditor
