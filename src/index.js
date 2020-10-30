/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime : 2020-10-30 11:01:13
 * @Description :
 */
import Vue from 'vue'

import 'core/support/index.js'
import 'core/styles/index.scss'
import 'animate.css/animate.css'

import FixedTools from 'core/editor/fixed-tools/index'
import EditorRightPanel from 'core/editor/right-panel/index'
import EditorCanvas from 'core/editor/canvas/index'
import EditorLeftPanel from 'core/editor/left-panel/index'
import AdjustLineV from 'core/support/adjust-line/vertical'

import store from 'core/store/index'
import i18n from 'core/locales/index'
import '@/plugins/index'

window.EditorApp = new Vue()

const CoreEditor = {
  name: 'CoreEditor',
  store,
  i18n,
  props: {
    work: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    work (newValue) {
      this.$store.commit('editor/setWork', newValue)
      this.$store.commit('editor/setEditingPage')
    }
  },
  data: () => ({
    previewDialogVisible: false,
    propsPanelWidth: 375
  }),
  methods: {
    handlePreview () {
      this.previewDialogVisible = true
    },
    getData () {
      return this.$store.state.editor.work
    }
  },
  render (h) {
    return (
      this.work.id && (
        <a-layout>
          <a-layout style={{ height: 'calc(100vh - 64px)' }}>
            <EditorLeftPanel />
            <EditorCanvas ref="editor" />
            <AdjustLineV
              onLineMove={offset => {
                this.propsPanelWidth += offset
              }}
            />
            <FixedTools />
            <EditorRightPanel width={this.propsPanelWidth} />
          </a-layout>
        </a-layout>
      )
    )
  }
}

CoreEditor.install = (Vue, opts = {}) => {
  Vue.component(CoreEditor.name, CoreEditor)
}

if (typeof window !== 'undefined' && window.Vue) {
  CoreEditor.install(window.Vue)
}

// test

export default CoreEditor
