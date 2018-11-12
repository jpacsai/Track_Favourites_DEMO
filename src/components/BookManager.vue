<template>
  <div class="container book">
    <h1 class="header">Book Manager</h1>
    <div class="top">
      <form @submit.prevent="newSearch" class="book_search-form">
        <input type="text" v-model='search' required class="book_search-input"/>
        <input type='submit' value="Search" class="book_search-submit"/>
      </form>
      <p class="book_searchNums" v-if="this.allResult !== 0">
        <span>results from {{ this.resultsFrom}} to {{ this.resultsTo }} out of {{ this.allResult }}</span>
      </p>
    </div>

    <search
      v-if="view === 'search'"
      v-bind:list="searchResult"
      class="search-results" />
    <series
      v-if="view === 'series'"
      v-bind:serieAuthor="serieAuthor"
      v-bind:serieTitle="serieTitle"
      v-bind:list="searchResult" />
    <author
      v-if="view === 'author'"
      v-bind:list="searchResult" />

    <div class="error" v-if="error === 'no_search'">
      <p>No results</p>
    </div>

    <div class="nav-btn-container" v-if="this.allResult > 20">
      <button class="nav-btn" @click="pageBackward">
        <img class='nav-btn-img' src='../assets/arrow_backw.svg'></button>
      <span>{{ this.page }}</span>
      <button class="nav-btn" @click="pageForward">
        <img class='nav-btn-img' src='../assets/arrow_forw.svg'>
      </button>
    </div>
    <!--
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Updated At</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book.id">
              <td>{{ book.id }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.updatedAt }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateBookToEdit(book)">Edit</a> -
                <a href="#" @click.prevent="deleteBook(book.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit Book ID#' + model.id : 'New Book')">
          <form @submit.prevent="saveBook">
            <b-form-group label="Title">
              <b-form-input type="text" v-model="model.title"></b-form-input>
            </b-form-group>
            <b-form-group label="Body">
              <b-form-textarea rows="4" v-model="model.body"></b-form-textarea>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Book</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row> -->
  </div>
</template>

<script>
import series from './Series'
import search from './Search'
import author from './Author'
// import api from '@/api'
import keys from '../../apiKeys.js'
const parser = require('fast-xml-parser')

export default {
  components: {
    series,
    search,
    author
  },
  data () {
    return {
      loading: false,
      error: null,
      view: null,
      today: null,
      books: [],
      model: {},
      search: '',
      page: 1,
      allPage: 0,
      resultsFrom: 0,
      resultsTo: 0,
      allResult: 0,
      searchResult: [],
      seriesView: false,
      serieAuthor: null,
      serieTitle: null,
      herokuNoCors: 'https://cors-escape.herokuapp.com/'
    }
  },
  created () {
    const now = new Date()
    const day = now.getDate()
    const month = now.getMonth() // January is 0!
    const year = now.getFullYear()
    const today = new Date(year, month, day)
    this.today = today
  },
  /*
  async created () {
    this.refreshBooks()
  }, */
  methods: {
    viewState_series () {
      this.view = 'series'
    },
    viewState_search () {
      this.view = 'search'
    },
    viewState_author () {
      this.view = 'author'
    },
    error_null () {
      this.error = null
    },
    error_noSearchResult () {
      this.error = 'no_search'
    },
    releaseDate (year, month, day) {
      return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0))
    },
    releaseString (year, month, day) {
      return day + '/' + month + '/' + year
    },
    decodeTitle (title) {
      return title.replace(/&amp;/g, '&')
    },
    checkSearchResults (arr) {
      const checkedArr = arr.filter(obj => obj.original_publication_year !== '')
      return checkedArr
    },
    /* add future (Boolean) and release date as String to book objects */
    parseArr (arr) {
      const parsed = arr.map(obj => {
        const year = obj.original_publication_year
        const month = obj.original_publication_month
        const day = obj.original_publication_day
        if (obj.best_book.hasOwnProperty('titleDecoded') === false) {
          obj.best_book.titleDecoded = this.decodeTitle(obj.best_book.title)
        }
        if (obj.hasOwnProperty('future') === false) {
          const releaseDate = this.releaseDate(year, month, day)
          obj.future = releaseDate > this.today
        }
        if (obj.hasOwnProperty('release') === false) {
          obj.release = this.releaseString(year, month, day)
        }
        if (obj.hasOwnProperty('serie') === false) {
          obj.serie = obj.best_book.title.includes('#')
          if (obj.serie === true) {
            this.serieAuthor = obj.best_book.author.name
          }
        }
        return obj
      })
      return parsed
    },
    parseArr_Author (arr) {
      console.log(arr)
      const parsed = arr.map(obj => {
        const year = obj.publication_year
        const month = obj.publication_month
        const day = obj.publication_day
        if (obj.hasOwnProperty('titleDecoded') === false) {
          obj.titleDecoded = this.decodeTitle(obj.title)
        }
        if (obj.hasOwnProperty('future') === false) {
          const releaseDate = this.releaseDate(year, month, day)
          obj.future = releaseDate > this.today
        }
        if (obj.hasOwnProperty('release') === false) {
          obj.release = this.releaseString(year, month, day)
        }
        if (obj.hasOwnProperty('serie') === false) {
          obj.serie = obj.title.includes('#')
          if (obj.serie === true) {
            this.serieAuthor = obj.authors.author.name
          }
        }
        return obj
      })
      return parsed
    },
    setPages (obj) {
      const allResults = obj.GoodreadsResponse.search['total-results']
      this.allResult = allResults
      this.resultsFrom = obj.GoodreadsResponse.search['results-start']
      this.resultsTo = obj.GoodreadsResponse.search['results-end']
      this.allPage = Math.ceil(allResults / 20)
    },
    setPageSeries (arr) {
      this.page = 1
      this.allResult = arr.length
      this.resultsFrom = 1
      this.resultsTo = arr.length
      this.allPage = 1
    },
    newSearch () {
      this.page = 1
      this.serieAuthor = null
      this.serieTitle = null
      this.searchResult = []
      if (this.view !== 'search') {
        this.viewState_search()
      }
      this.searchBooks()
    },
    searchBooks () {
      fetch(
        this.herokuNoCors + 'https://www.goodreads.com/search/index.xml?key=' +
          keys.bookKey + '&q=' + this.search + '&page=' + this.page
      )
        .then(data => data.blob())
        .then(data => {
          const text = this.handleUpload(data)
          return text
        })
        .then(text => {
          var jsonObj = parser.parse(text)
          this.setPages(jsonObj)
          const res = jsonObj.GoodreadsResponse.search.results.work
          console.log(res)
          if (Array.isArray(res) === true) {
            const checkedArr = this.checkSearchResults(res)
            this.searchResult = this.parseArr(checkedArr)
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
    findSeries (id, title) {
      this.getWhichSeries(id)
        .then(data => {
          this.serieTitle = data.GoodreadsResponse.series_works.series_work.series.title
          const seriesId = data.GoodreadsResponse.series_works.series_work.series.id
          return this.getSeries(seriesId)
        })
        .then(seriesBook => {
          console.log(seriesBook)
          this.search = ''
          this.page = 1
          this.searchResult = this.parseArr(seriesBook)
          this.setPageSeries(seriesBook)
          this.viewState_series()
        })
        .catch(function (error) {
          console.log('Looks like there was a problem: \n', error)
        })
    },
    /* list which series the work is in with the workId */
    getWhichSeries (id) {
      console.log(id)
      return fetch(this.herokuNoCors + 'https://www.goodreads.com/series/work/' + id + '?format=xml&key=' + keys.bookKey)
        .then(data => data.blob())
        .then(data => {
          const text = this.handleUpload(data)
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
    getSeries (id) {
      return fetch(this.herokuNoCors + 'https://www.goodreads.com/series/' + id + '?format=xml&key=' + keys.bookKey)
        .then(data => data.blob())
        .then(data => {
          const text = this.handleUpload(data)
          return text
        })
        .then(text => {
          var jsonObj = parser.parse(text)
          const arr = jsonObj.GoodreadsResponse.series['series_works']['series_work']
          // console.log(jsonObj)
          const transArr = this.transformSeries(arr)
          return transArr
        })
        .catch(function (error) {
          console.log('Looks like there was a problem: \n', error)
        })
    },
    /* add books of a serie to display list */
    transformSeries (arr) {
      const t = arr.reduce((a, obj) => {
        const o = obj.work
        o.position = obj.user_position.toString()
        a.push(o)
        return a
      }, [])
      return t
    },
    authorBooks (authorId) {
      fetch(this.herokuNoCors + 'https://www.goodreads.com/author/show/' + authorId + '?format=xml&key=' + keys.bookKey)
        .then(data => data.blob())
        .then(data => {
          const text = this.handleUpload(data)
          return text
        })
        .then(text => {
          var jsonObj = parser.parse(text)
          const arr = jsonObj.GoodreadsResponse.author.books.book
          this.searchResult = this.parseArr_Author(arr)
          this.viewState_author()
        })
        .catch(function (error) {
          console.log('Looks like there was a problem: \n', error)
        })
    },
    pageForward () {
      if (this.page < this.allPage) {
        this.page++
        this.searchBooks()
        this.scrollUp()
      }
    },
    pageBackward () {
      if (this.page > 1) {
        this.page--
        this.searchBooks()
        this.scrollUp()
      }
    },
    scrollUp () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
    /* read xml response */
    readUploadedFileAsText (inputFile) {
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
    async handleUpload (data) {
      const file = data
      try {
        const fileContents = await this.readUploadedFileAsText(file)
        return fileContents
      } catch (e) {
        console.warn(e.message)
      }
    }
    /*
    async refreshBooks () {
      this.loading = true
      this.books = await api.getBooks()
      this.loading = false
    },
    async populateBooksToEdit (book) {
      this.model = Object.assign({}, book)
    },
    async saveBook () {
      if (this.model.id) {
        await api.updateBook(this.model.id, this.model)
      } else {
        await api.createBook(this.model)
      }
      this.model = {} // reset form
      await this.refreshBooks()
    },
    async deleteBook (id) {
      if (confirm('Are you sure you want to delete this book?')) {
        // if we are editing a book we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {}
        }
        await api.deleteBook(id)
        await this.refreshBooks()
      }
    } */
  }
}
</script>