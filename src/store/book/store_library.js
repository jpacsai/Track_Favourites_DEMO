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
    console.log(book)
    /*
    if (this.model.id) {
      await api.updateBook(this.model.id, this.model)
    } else {
      await api.createBook(this.model)
    } */
    // this.model = {} // reset form
    await api.createBook(book)
    await dispatch('refreshBooks')
  },
  async deleteBook ({dispatch}, id) {
    /*
    if (confirm('Are you sure you want to delete this book?')) {
      // if we are editing a book we deleted, remove it from the form
      if (this.model.id === id) {
        this.model = {}
      }
      await api.deleteBook(id)
      await this.refreshBooks()
    } */
    await api.deleteBook(id)
    await dispatch('refreshBooks')
  },
  async updateBook ({dispatch}, [id, obj]) {
    console.log(obj)
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
