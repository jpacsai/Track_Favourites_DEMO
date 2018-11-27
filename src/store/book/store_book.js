import newBookStore from './store_newBooks'
import libraryStore from './store_library'

const bookStore = {
  namespaced: true,
  state: {
    section: 'library'
  },
  modules: {
    library: libraryStore,
    newBooks: newBookStore
  },
  mutations: {
    SET_SECTION (state, section) {
      console.log('mutate: ' + section)
      state.section = section
    }
  }
}

export default bookStore
