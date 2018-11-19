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
  error: null,
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
  ERROR_NO_RESULT (state) {
    console.log('no result')
    state.error = 'No result'
  },
  NO_ERROR (state) {
    state.error = null
  },
  VIEW_SEARCH (state) {
    state.view = 'search'
  },
  VIEW_SERIES (state) {
    state.view = 'series'
  },
  VIEW_ERROR (state) {
    state.view = 'error'
    console.log(state.view)
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
  set_error_noResult ({commit}) {
    commit('VIEW_ERROR')
    commit('ERROR_NO_RESULT')
  },
  set_noError ({commit}) {
    commit('NO_ERROR')
  },
  newSearch ({dispatch}) {
    dispatch('set_viewState_search')
    dispatch('set_noError')
  },
  search_book ({dispatch}, text) {
    console.log('FETCH - search books')
    dispatch('newSearch')
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
        if (res === undefined) {
          dispatch('set_error_noResult')
        } else {
          const result = Array.isArray(res) === false ? parseArr([res], state.today) : parseArr(res, state.today)
          dispatch('set_display', result)
          console.log(result)
          if (state.view !== 'search') {
            dispatch('set_viewState_search')
          }
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
