import keys from '../../../apiKeys'
import handleUpload from './helpers/convertStream'
import parseArr from './helpers/parseArr'
import extractSeries from './helpers/extractSerieTitle'
import transformSeries from './helpers/transformSeries'
import scrollUp from './helpers/scrollUp.js'
const parser = require('fast-xml-parser')

const state = {
  herokuNoCors: 'https://cors-anywhere.herokuapp.com/',
  today: null,
  searchText: null,
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
  seriesId: null,
  loading: false
}

const mutations = {
  TODAY (state, date) {
    state.today = date
  },
  LOADING_TRUE (state) {
    state.loading = true
  },
  LOADING_FALSE (state) {
    state.loading = false
  },
  SET_SEARCH_TEXT (state, text) {
    state.searchText = text
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
  SET_AUTHOR_NAME (state, author) {
    state.authorName = author
  },
  SET_AUTHOR_ID (state, authorId) {
    state.authorId = authorId
  },
  SET_SERIES_TITLE (state, title) {
    state.seriesTitle = title
  },
  SET_SERIES_ID (state, id) {
    state.seriesId = id
  },
  SET_ALL_RESULT (state, num) {
    state.allResults = num
  },
  SET_ALL_PAGE (state, page) {
    state.allPage = page
  },
  SET_PAGE_NUMBERS_NULL (state) {
    state.page = 1
    state.allPage = 1
    state.allResults = 0
    state.resultsFrom = 0
    state.resultsTo = 0
  },
  SET_PAGE_NUMBERS_SEARCH (state, numbers) {
    state.allResults = numbers.all
    state.resultsFrom = numbers.from
    state.resultsTo = numbers.to
    state.allPage = numbers.allPages
  },
  SET_PAGE_NUMBERS_SERIES (state, numbers) {
    state.page = numbers.page
    state.allResults = numbers.all
    state.resultsFrom = numbers.from
    state.resultsTo = numbers.to
    state.allPage = numbers.allPages
  },
  SET_PAGE_NUMBERS_AUTHOR (state, numbers) {
    state.resultsFrom = numbers.from
    state.resultsTo = numbers.to
  },
  PAGE_FORWARD (state) {
    state.page++
  },
  PAGE_BACKWARD (state) {
    state.page--
  }
}

const actions = {
  set_today ({commit}, date) {
    commit('TODAY', date)
  },
  set_loading_true ({commit}) {
    commit('LOADING_TRUE')
  },
  set_loading_false ({commit}) {
    commit('LOADING_FALSE')
  },
  set_searchText ({commit}, text) {
    commit('SET_SEARCH_TEXT', text)
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
  set_pageNumbers_search ({commit}, numbers) {
    commit('SET_PAGE_NUMBERS_SEARCH', numbers)
  },
  set_pageNumbers_series ({commit}, numbers) {
    commit('SET_PAGE_NUMBERS_SERIES', numbers)
  },
  set_pageNumbers_author ({commit}, numbers) {
    commit('SET_PAGE_NUMBERS_AUTHOR', numbers)
  },
  page_forward ({commit}) {
    commit('PAGE_FORWARD')
  },
  page_backward ({commit}) {
    commit('PAGE_BACKWARD')
  },
  set_allResult ({commit}, num) {
    commit('SET_ALL_RESULT', num)
  },
  set_allPage ({commit}, page) {
    commit('SET_ALL_PAGE', page)
  },
  set_authorName ({commit}, author) {
    commit('SET_AUTHOR_NAME', author)
  },
  set_authorId ({commit}, authorId) {
    commit('SET_AUTHOR_ID', authorId)
  },
  set_seriesTitle ({commit}, title) {
    commit('SET_SERIES_TITLE', title)
  },
  set_seriesId ({commit}, id) {
    commit('SET_SERIES_ID', id)
  },
  set_error_noResult ({commit}) {
    commit('VIEW_ERROR')
    commit('ERROR_NO_RESULT')
  },
  set_noError ({commit}) {
    commit('NO_ERROR')
  },
  reset_search ({dispatch}) {
    dispatch('set_display', [])
    dispatch('set_pageNumbers_null')
    dispatch('set_noError')
    dispatch('set_viewState_search')
  },
  new_search ({dispatch}, [text, library]) {
    dispatch('set_searchText', text)
    dispatch('set_pageNumbers_null')
    dispatch('set_noError')
    dispatch('search_book', [text, library])
  },
  search_book ({dispatch}, [text, library]) {
    console.log('FETCH - search books')
    dispatch('set_loading_true')
    fetch(
      state.herokuNoCors + 'https://www.goodreads.com/search/index.xml?key=' +
        keys.bookKey + '&q=' + text + '&page=' + state.page
    )
      .then(data => {
        return dispatch('convertXML', data)
      })
      .then(jsonObj => {
        dispatch('set_loading_false')
        dispatch('pageNumbers_search', jsonObj)
        const res = jsonObj.GoodreadsResponse.search.results.work
        if (res === undefined) {
          dispatch('set_error_noResult')
        } else {
          const result = Array.isArray(res) === false ? parseArr([res], library, state.today) : parseArr(res, library, state.today)
          console.log(result)
          dispatch('set_display', result)
          if (state.view !== 'search') {
            dispatch('set_viewState_search')
            dispatch('set_seriesTitle', null)
            dispatch('set_seriesId', null)
            dispatch('set_authorName', null)
            dispatch('set_authorId', null)
            scrollUp()
          }
        }
      })
      .catch(function (error) {
        console.log('Looks like there was a problem: \n', error)
      })
  },
  search_series ({dispatch}, [id, title, author, authorId, library]) {
    console.log('FETCH - serie id: ' + id + ', title: ' + title + ', author: ' + author)
    dispatch('set_loading_true')
    dispatch('getWhichSeries', id)
      .then(data => {
        dispatch('set_authorName', author)
        dispatch('set_seriesTitle', title)
        dispatch('set_authorId', authorId)
        const s = extractSeries(data.GoodreadsResponse.series_works.series_work, title)
        const seriesId = s.series.id
        return dispatch('getSeries', seriesId)
      })
      .then(seriesBook => {
        console.log(seriesBook)
        dispatch('set_loading_false')
        const result = parseArr(seriesBook, library, state.today)
        // console.log(result)
        dispatch('set_display', result)
        dispatch('set_viewState_series')
        dispatch('pageNumbers_series', seriesBook)
        scrollUp()
      })
      .catch(function (error) {
        console.log('Looks like there was a problem: \n', error)
      })
  },
  getWhichSeries ({dispatch}, id) {
    console.log('FETCH - serie books, id: ' + id)

    return fetch(state.herokuNoCors + 'https://www.goodreads.com/series/work/' + id + '?format=xml&key=' + keys.bookKey)
      .then(data => {
        return dispatch('convertXML', data)
      })
      .catch(function (error) {
        console.log('Looks like there was a problem: \n', error)
      })
  },
  getSeries ({dispatch}, id) {
    return fetch(state.herokuNoCors + 'https://www.goodreads.com/series/' + id + '?format=xml&key=' + keys.bookKey)
      .then(data => {
        return dispatch('convertXML', data)
      })
      .then(jsonObj => {
        const arr = jsonObj.GoodreadsResponse.series['series_works']['series_work']
        const transArr = transformSeries(arr)
        return transArr
      })
      .catch(function (error) {
        console.log('Looks like there was a problem: \n', error)
      })
  },
  fetch_new_authorBooks ({dispatch}, [authorName, authorId, library]) {
    dispatch('set_authorName', authorName)
    dispatch('set_authorId', authorId)
    dispatch('fetch_authorDetails')
    dispatch('fetch_authorBooks', library)
    scrollUp()
  },
  fetch_authorBooks ({dispatch}, library) {
    console.log('FETCH - all books ' + state.authorName + ' : ' + state.authorId + ', page ' + state.page)
    dispatch('set_loading_true')

    fetch(state.herokuNoCors + 'https://www.goodreads.com/author/list/' + state.authorId + '?format=xml&key=' + keys.bookKey + '&page=' + state.page)
      .then(data => {
        return dispatch('convertXML', data)
      })
      .then(jsonObj => {
        dispatch('set_loading_false')
        const arr = jsonObj.GoodreadsResponse.author.books.book
        // console.log(arr)
        const result = parseArr(arr, library, state.today)
        console.log(result)
        dispatch('set_display', result)
        dispatch('set_viewState_author')
        dispatch('set_seriesTitle', null)
        dispatch('set_seriesId', null)
        dispatch('pageNumbers_author')
      })
      .catch(function (error) {
        console.log('Looks like there was a problem: \n', error)
      })
  },
  fetch_authorDetails ({dispatch}) {
    console.log('FETCH - author id ' + state.authorId)

    return fetch(state.herokuNoCors + 'https://www.goodreads.com/author/show/' + state.authorId + '?format=xml&key=' + keys.bookKey)
      .then(data => {
        return dispatch('convertXML', data)
      })
      .then(jsonObj => {
        const workCount = jsonObj.GoodreadsResponse.author.works_count
        const pages = Math.ceil(workCount / 30)
        dispatch('set_allResult', workCount)
        dispatch('set_allPage', pages)
      })
      .catch(function (error) {
        console.log('Looks like there was a problem: \n', error)
      })
  },
  pageNumbers_search ({dispatch}, obj) {
    const numbers = {
      all: obj.GoodreadsResponse.search['total-results'],
      from: obj.GoodreadsResponse.search['results-start'],
      to: obj.GoodreadsResponse.search['results-end'],
      get allPages () { return Math.ceil(this.all / obj.GoodreadsResponse.search.results.work.length) }
    }
    dispatch('set_pageNumbers_search', numbers)
  },
  pageNumbers_series ({dispatch}, arr) {
    const numbers = {
      page: 1,
      all: arr.length,
      from: 1,
      to: arr.length,
      allPage: 1
    }
    dispatch('set_pageNumbers_series', numbers)
  },
  pageNumbers_author ({dispatch}) {
    const numbers = {
      from: 1 + (state.page - 1) * 30,
      get to () { return this.from + state.displayList.length - 1 }
    }
    dispatch('set_pageNumbers_author', numbers)
  },
  pageForward ({dispatch}, library) {
    if (state.page < state.allPage) {
      dispatch('page_forward')
      dispatch('turnPage', library)
    }
  },
  pageBackward ({dispatch}, library) {
    if (state.page > 1) {
      dispatch('page_backward')
      dispatch('turnPage', library)
    }
  },
  turnPage ({dispatch}, library) {
    if (state.view === 'search') {
      dispatch('search_book', [state.searchText, library])
    } else if (state.view === 'author') {
      dispatch('fetch_authorBooks', library)
    }
    scrollUp()
  },
  convertXML ({dispatch}, data) {
    return data.blob()
      .then(data => {
        return handleUpload(data)
      })
      .then(fileContent => {
        return parser.parse(fileContent)
      })
      .catch(function (error) {
        console.log('Looks like there was a problem: \n', error)
      })
  }
}

const newBookStore = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default newBookStore
