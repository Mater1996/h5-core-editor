/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-12 09:18:26
 * @Description :
 */
import CoreEditor from '@/core'
import Page from '@/editor/models/page'
import Work from '@/editor/models/work'

export const actions = {
  updateWork ({ commit, state }, payload = {}) {
    // update work with strapi
    const work = {
      ...state.work,
      ...payload
    }
    commit('setWork', work)
  }
}

// mutations
export const mutations = {
  setWorkCover (state, { type, value }) {
    const [cover] = value
    state.work.cover_image_url = cover.url
  },
  setWorkTemplates (state, { type, value }) {
    value.sort((a, b) => b.id - a.id)
    state.workTemplates = value
  },
  setWork (state, work) {
    window.__work = work
    work.pages = work.pages.map(page => {
      page.elements = page.elements.map(element => new CoreEditor.Element(element))
      return new Page(page)
    })
    state.work = new Work(work)
  },
  previewWork (state, { type, value }) {},
  deployWork (state, { type, value }) {},
  formDetailOfWork (state, { type, value }) {
    state.formDetailOfWork = value
  }
}
