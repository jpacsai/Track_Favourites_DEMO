import Vue from 'vue'
import Vuex from 'vuex'
import keys from '../../apiKeys.js'
import handleUpload from '../helpers/convertXML'
import parseArr from '../helpers/parseArr'
import parseHelpers from './../helpers/parseHelpers'

const parser = require('fast-xml-parser')

Vue.use(Vuex)

const state = {
  herokuNoCors: 'https://cors-escape.herokuapp.com/',
  today: null,
  view: 'search',
  displayList: [],
  page: 1,
  series: {
    title: null,
    seriesId: null,
    author: null,
    authorId: null
  }
}

const mutations = {
  TODAY (state, date) {
    state.today = date
  },
  VIEW_SEARCH (state) {
    state.view = 'search'
  },
  VIEW_SERIES (state) {
    state.view = 'series'
  },
  ADD_DISPLAY_LIST (state, result) {
    state.displayList = result // what if only one result? -> not arr
  },
  SET_SERIES_AUTHOR_NAME (state, author) {
    state.series.author = author
  },
  SET_SERIES_AUTHOR_ID (state, authorId) {
    state.series.authorId = authorId
  },
  SET_SERIES_TITLE (state, title) {
    state.series.title = title
  }
}

const actions = {
  set_today ({commit}, date) {
    commit('TODAY', date)
  },
  set_display ({commit}, result) {
    commit('ADD_DISPLAY_LIST', result)
  },
  set_viewState_search ({commit}) {
    commit('VIEW_SEARCH')
  },
  set_viewState_series ({commit}) {
    commit('VIEW_SERIES')
  }, /*
  viewState_author () {
    this.view = 'author'
  }, */
  set_seriesAuthorName ({commit}, author) {
    commit('SET_SERIES_AUTHOR_NAME', author)
  },
  set_seriesAuthorId ({commit}, authorId) {
    commit('SET_SERIES_AUTHOR_ID', authorId)
  },
  set_seriesTitle ({commit}, title) {
    commit('SET_SERIES_TITLE', title)
  },
  search_book ({dispatch}, text) {
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
        // this.setPages(jsonObj) // FIX THIS
        const res = jsonObj.GoodreadsResponse.search.results.work
        if (Array.isArray(res) === true) {
          const result = parseArr(res, state.today)
          console.log(result)
          dispatch('set_display', result)
        } else if (res === undefined) { // FIX THIS
          this.error_noSearchResult()
        } else { // FIX THIS
          const parsedObj = this.parseArr([res])
          this.searchResult.push(parsedObj)
        }
        if (state.view !== 'search') {
          dispatch('set_viewState_search')
        }
      })
      .catch(function (error) {
        console.log('Looks like there was a problem: \n', error)
      })
  },
  search_series ({dispatch}, [id, title, author, authorId]) {
    console.log('FETCH - serie id: ' + id + ', title: ' + title + ', author: ' + author)
    dispatch('getWhichSeries', id)
      .then(data => {
        dispatch('set_seriesAuthorName', author)
        dispatch('set_seriesTitle', title)
        dispatch('set_seriesAuthorId', authorId)
        const s = parseHelpers.extractSeries(data.GoodreadsResponse.series_works.series_work, title)
        const seriesId = s.series.id
        return dispatch('getSeries', seriesId)
      })
      .then(seriesBook => {
        console.log(seriesBook)
        // this.search = ''
        // this.page = 1
        const result = parseArr(seriesBook, state.today)
        dispatch('set_display', result)
        // this.setPageSeries(seriesBook)
        dispatch('set_viewState_series')
      })
      .catch(function (error) {
        console.log('Looks like there was a problem: \n', error)
      })
  },
  getWhichSeries ({dispatch}, id) {
    console.log('FETCH - serie books ')
    return fetch(state.herokuNoCors + 'https://www.goodreads.com/series/work/' + id + '?format=xml&key=' + keys.bookKey)
      .then(data => data.blob())
      .then(data => {
        const text = handleUpload(data)
        return text
      })
      .then(text => {
        var jsonObj = parser.parse(text)
        return jsonObj
      })
      .catch(function (error) {
        console.log('Looks like there was a problem: \n', error)
      })
  },
  getSeries ({dispatch}, id) {
    return fetch(state.herokuNoCors + 'https://www.goodreads.com/series/' + id + '?format=xml&key=' + keys.bookKey)
      .then(data => data.blob())
      .then(data => {
        const text = handleUpload(data)
        return text
      })
      .then(text => {
        var jsonObj = parser.parse(text)
        const arr = jsonObj.GoodreadsResponse.series['series_works']['series_work']
        const transArr = parseHelpers.transformSeries(arr)
        return transArr
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
