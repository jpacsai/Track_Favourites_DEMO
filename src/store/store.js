import Vue from 'vue'
import Vuex from 'vuex'
import keys from '../../apiKeys.js'
import handleUpload from './helpers/convertXML'
import parseArr from './helpers/parseArr'
import parseArrAuthor from './helpers/parseArr_author'
import extractSeries from './helpers/extractSerieTitle'
import transformSeries from './helpers/transformSeries'

const parser = require('fast-xml-parser')

Vue.use(Vuex)

const state = {
  herokuNoCors: 'https://cors-escape.herokuapp.com/',
  today: null,
  error: null,
  view: 'search',
  displayList: [],
  page: 1,
  allPage: 1,
  resultsFrom: 0,
  resultsTo: 0,
  allResults: 0,
  authorName: null,
  authorId: null,
  seriesTitle: null,
  seriesId: null
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
  VIEW_AUTHOR (state) {
    state.view = 'author'
  },
  VIEW_ERROR (state) {
    state.view = 'error'
  },
  ADD_DISPLAY_LIST (state, result) {
    state.displayList = result // what if only one result? -> not arr
  },
  SET_SERIES_AUTHOR_NAME (state, author) {
    state.authorName = author
  },
  SET_SERIES_AUTHOR_ID (state, authorId) {
    state.authorId = authorId
  },
  SET_SERIES_TITLE (state, title) {
    state.seriesTitle = title
  },
  SET_PAGE_NUMBERS_NULL (state) {
    state.page = 1
    state.allPage = 1
    state.allResults = 0
    state.resultsFrom = 0
    state.resultsTo = 0
  },
  SET_PAGE_NUMBERS (state, numbers) {
    state.allResults = numbers.all
    state.resultsFrom = numbers.from
    state.resultsTo = numbers.to
    state.allPage = numbers.allPages
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
  },
  set_viewState_author ({commit}) {
    commit('VIEW_AUTHOR')
  },
  set_pageNumbers_null ({commit}) {
    commit('SET_PAGE_NUMBERS_NULL')
  },
  set_pageNumbers ({commit}, numbers) {
    commit('SET_PAGE_NUMBERS', numbers)
  },
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
  newSearch ({dispatch}) { // add page settings
    dispatch('set_pageNumbers_null')
    dispatch('set_viewState_search')
    dispatch('set_noError')
  },
  search_book ({dispatch}, text) {
    dispatch('newSearch')

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
        dispatch('searchPageNumbers', jsonObj)
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
        const s = extractSeries(data.GoodreadsResponse.series_works.series_work, title)
        const seriesId = s.series.id
        return dispatch('getSeries', seriesId)
      })
      .then(seriesBook => {
        console.log(seriesBook)
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
        const transArr = transformSeries(arr)
        return transArr
      })
      .catch(function (error) {
        console.log('Looks like there was a problem: \n', error)
      })
  },
  fetch_authorBooks ({dispatch}, [authorName, authorId]) {
    dispatch('set_seriesAuthorName', authorName)
    dispatch('set_seriesAuthorId', authorId)
    console.log('FETCH - all books ' + authorName + ' : ' + authorId + ', page ' + state.page)
    fetch(state.herokuNoCors + 'https://www.goodreads.com/author/list/' + authorId + '?format=xml&key=' + keys.bookKey)
      .then(data => data.blob())
      .then(data => {
        const text = handleUpload(data)
        return text
      })
      .then(text => {
        var jsonObj = parser.parse(text)
        const arr = jsonObj.GoodreadsResponse.author.books.book
        // this.setPageAuthor(arr)
        const result = parseArrAuthor(arr, state.today)
        console.log(result)
        dispatch('set_display', result)
        dispatch('set_viewState_author')
      })
      .catch(function (error) {
        console.log('Looks like there was a problem: \n', error)
      })
  },
  fetch_authorDetails ({dispatch}, authorId) {
    console.log('FETCH - author id ' + authorId)

    fetch(state.herokuNoCors + 'https://www.goodreads.com/author/show/' + authorId + '?format=xml&key=' + keys.bookKey)
      .then(data => data.blob())
      .then(data => {
        const text = handleUpload(data)
        return text
      })
      .then(text => {
        // var jsonObj = parser.parse(text)
        // const workCount = jsonObj.GoodreadsResponse.author.works_count
        // this.allResult = workCount
        // this.page = 1
        // this.allPage = Math.ceil(workCount / 30)
      })
      .catch(function (error) {
        console.log('Looks like there was a problem: \n', error)
      })
  },
  searchPageNumbers ({dispatch}, obj) {
    const numbers = {
      all: obj.GoodreadsResponse.search['total-results'],
      from: obj.GoodreadsResponse.search['results-start'],
      to: obj.GoodreadsResponse.search['results-end'],
      get allPages () { return Math.ceil(this.all / obj.GoodreadsResponse.search.results.work.length) }
    }
    dispatch('set_pageNumbers', numbers)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
