/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-11 15:23:52
 * @Description :
 */
// initial state
import Work from '@/editor/models/work'
import { actions as canvasActions, mutations as canvasMutations } from './canvas'
import { actions as pageActions, mutations as pageMutations } from './page'
import { actions as elementActions, mutations as elementMutations } from './element'
import { actions as workActions, mutations as workMutations } from './work'

const state = {
  works: [],
  work: new Work(),
  editingPage: { elements: [] },
  editingElement: null,
  formDetailOfWork: {
    uuidMap2Name: {},
    formRecords: []
  },
  workTemplates: [],
  scaleRate: 1
}

// getters
const getters = {}

// actions
const actions = {
  ...elementActions,
  ...pageActions,
  ...workActions,
  ...canvasActions
}

// mutations
const mutations = {
  ...elementMutations,
  ...pageMutations,
  ...workMutations,
  ...canvasMutations
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
