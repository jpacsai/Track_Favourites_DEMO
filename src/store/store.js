import Vue from 'vue'
import Vuex from 'vuex'
import keys from '../../apiKeys.js'
const parser = require('fast-xml-parser')

Vue.use(Vuex)

const state = {
  herokuNoCors: 'https://cors-escape.herokuapp.com/',
  today: null,
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
  search_book ({commit, dispatch}, text) {
    console.log('FETCH - search books')
    fetch(
      state.herokuNoCors + 'https://www.goodreads.com/search/index.xml?key=' +
        keys.bookKey + '&q=' + text + '&page=' + state.page
    )
      .then(data => data.blob())
      .then(data => {
        const text = dispatch('handleUpload', data)
        return text
      })
      .then(text => {
        var jsonObj = parser.parse(text)
        // this.setPages(jsonObj)
        const res = jsonObj.GoodreadsResponse.search.results.work
        console.log(res)
        if (Array.isArray(res) === true) {
          const parsed = dispatch('parseArr', res)
          commit('ADD_SEARCH_RESULT', parsed)
        } else if (res === undefined) {
          this.error_noSearchResult()
        } else {
          const parsedObj = this.parseArr([res])
          this.searchResult.push(parsedObj)
        }
      })
      .catch(function (error) {
        console.log('Looks like there was a problem: \n', error)
      })
  },
  parseArr ({commit, dispatch}, arr) {
    const parsed = arr.map(obj => {
      const year = obj.original_publication_year || 1900
      const month = obj.original_publication_month || 1
      const day = obj.original_publication_day || 1
      if (obj.best_book.hasOwnProperty('titleDecoded') === false) {
        obj.best_book.titleDecoded = dispatch('decodeTitle', obj.best_book.title)
      }
      if (obj.hasOwnProperty('future') === false) {
        const releaseDate = dispatch('releaseDate', [year, month, day])
        obj.future = releaseDate > this.today
      }
      if (obj.hasOwnProperty('release') === false) {
        obj.release = dispatch('releaseString', [year, month, day])
      }
      if (obj.hasOwnProperty('serie') === false) {
        obj.serie = obj.best_book.title.includes('#')
      }
      return obj
    })
    return parsed
  },
  decodeTitle ({commit}, title) {
    return title.replace(/&amp;/g, '&')
  },
  releaseDate ({commit}, [year, month, day]) {
    return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0))
  },
  releaseString ({commit}, [year, month, day]) {
    return day + '/' + month + '/' + year
  },
  readUploadedFileAsText ({commit, dispatch}, inputFile) {
    const temporaryFileReader = new FileReader()

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort()
        reject(new DOMException('Problem parsing input file.'))
      }
      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result)
      }
      temporaryFileReader.readAsText(inputFile)
    })
  },
  async handleUpload ({commit, dispatch}, data) {
    const file = data
    try {
      const fileContents = await dispatch('readUploadedFileAsText', file)
      return fileContents
    } catch (e) {
      console.warn(e.message)
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
