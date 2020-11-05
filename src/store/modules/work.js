import Element from '@/models/element'
import Page from '@/models/page'
import Work from '@/models/work'

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
      page.elements = page.elements.map(element => new Element(element))
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
