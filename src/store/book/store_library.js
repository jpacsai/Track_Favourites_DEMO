import api from '@/api'

const state = {
  myBooks: []
}

const mutations = {
  SET_BOOKS (state, arr) {
    state.myBooks = arr
  }
}

const actions = {
  async refreshBooks ({dispatch}) {
    console.log('refresh')
    const books = await api.getBooks()
    dispatch('set_books', books)
  },
  set_books ({commit}, arr) {
    console.log(arr)
    commit('SET_BOOKS', arr)
  },
  async saveBook ({dispatch}, book) {
    await api.createBook(book)
    await dispatch('refreshBooks')
  },
  async deleteBook ({dispatch}, id) {
    await api.deleteBook(id)
    await dispatch('refreshBooks')
  },
  async updateBook ({dispatch}, [id, obj]) {
    await api.updateBook(id, obj)
    await dispatch('refreshBooks')
  }
}

const libraryStore = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default libraryStore
