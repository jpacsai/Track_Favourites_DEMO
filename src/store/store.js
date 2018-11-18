import Vue from 'vue'
import Vuex from 'vuex'
import keys from '../../apiKeys.js'
import handleUpload from '../helpers/convertXML'
import parseArrSearch from './../helpers/parseArr_Search'
const parser = require('fast-xml-parser')

Vue.use(Vuex)

const state = {
  herokuNoCors: 'https://cors-escape.herokuapp.com/',
  today: null,
  view: 'search',
  searchResult: [],
  page: 1
}

const mutations = {
  TODAY (state, date) {
    state.today = date
  },
  ADD_SEARCH_RESULT (state, result) {
    state.searchResult = result // what if only one result? -> not arr
  }
}

const actions = {
  setToday ({commit}, date) {
    commit('TODAY', date)
  },
  viewState_search ({commit}) {
    commit = 'VIEW_SEARCH'
  }, /*
  viewState_series () {
    this.view = 'series'
  },
  viewState_author () {
    this.view = 'author'
  }, */
  search_book ({commit}, text) {
    console.log('FETCH - search books')
    fetch(
      state.herokuNoCors + 'https://www.goodreads.com/search/index.xml?key=' +
        keys.bookKey + '&q=' + text + '&page=' + state.page
    )
      .then(data => data.blob())
      .then(data => {
        const text = handleUpload(data)
        return text
      })
      .then(text => {
        var jsonObj = parser.parse(text)
        // this.setPages(jsonObj)
        const res = jsonObj.GoodreadsResponse.search.results.work
        if (Array.isArray(res) === true) {
          const result = parseArrSearch(res, state.today)
          console.log(result)
          commit('ADD_SEARCH_RESULT', result)
        } else if (res === undefined) { // FIX THIS
          this.error_noSearchResult()
        } else { // FIX THIS
          const parsedObj = this.parseArr([res])
          this.searchResult.push(parsedObj)
        }
      })
      .catch(function (error) {
        console.log('Looks like there was a problem: \n', error)
      })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
