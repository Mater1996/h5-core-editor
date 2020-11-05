/*
 * @Author: ly525
 * @Date: 2020-10-11 10:13:51
 * @LastEditors : Please set LastEditors
 * @LastEditTime : 2020-10-29 10:03:39
 * @FilePath: /luban-h5/front-end/h5/src/components/@/store/index.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
import Vue from 'vue'
import Vuex from 'vuex'
import undoRedoPlugin from './plugins/undo-redo/index'
import editor from './modules/editor'
import i18n from './modules/i18n'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    editor,
    i18n
  },
  plugins: [undoRedoPlugin]
})
