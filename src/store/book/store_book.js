import newBookStore from './store_newBooks'
import libraryStore from './store_library'

const bookStore = {
  namespaced: true,
  modules: {
    library: libraryStore,
    newBooks: newBookStore
  }
}

export default bookStore
