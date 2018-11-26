import Vue from 'vue'
import Vuex from 'vuex'
import bookStore from './book/store_book'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    book: bookStore
  }
})
