import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  search: ''
}

const mutations = {
  ADD_SEARCH: (state, newSearch) => {
    state.search = newSearch
  }
}

const actions = {}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
