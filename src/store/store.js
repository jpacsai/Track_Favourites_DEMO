import Vue from 'vue'
import Vuex from 'vuex'
import newBookStore from './book/store_newBooks'
import libraryStore from './book/store_library'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    library: libraryStore,
    newBooks: newBookStore
  }
})
