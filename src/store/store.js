import Vue from 'vue'
import Vuex from 'vuex'
import bookStore from './book/store_book'
import reminderStore from './reminder/store_reminders'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    book: bookStore,
    reminder: reminderStore
  }
})
