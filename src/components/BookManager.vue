<template>
  <div class="container">
    <h1 class="header">Book Manager</h1>
    <div class="top">
      <form @submit.prevent="newSearch">
        <input type="text" v-model='search' required/>
        <input type='submit' value="Search" />
      </form>
      <p class="searchNums" v-if="this.allResult !== 0">
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
      v-bind:list="searchResult" />

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
// import api from '@/api'
import keys from '../../apiKeys.js'
const parser = require('fast-xml-parser')

export default {
  components: {
    series,
    search
  },
  data () {
    return {
      loading: false,
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
          obj.serie = obj.best_book.title.includes('(')
          if (obj.serie === true) {
            this.serieAuthor = obj.best_book.author.name
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
          // console.log(data)
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
      return fetch(this.herokuNoCors + 'https://www.goodreads.com/series/work/' + id + '?format=xml&key=' + keys.bookKey)
        .then(data => data.blob())
        .then(data => {
          const text = this.handleUpload(data)
          return text
        })
        .then(text => {
          var jsonObj = parser.parse(text)
          // console.log(jsonObj)
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

<style scoped>
  .container {
    max-width: 1100px;
    margin-top: 20px;
    padding: 0 0 50px 0;
  }

  form {
    display: grid;
    grid-template-columns: 1fr 140px;
  }
  
  input[type='text'] {
    padding-left: 10px;
  }

  input[type='submit'] {
    margin: 0 auto;
    width: 80px;
    border: none;
    background-color: greenyellow;
    border-radius: 3px;
    transition: 0.2s;
  }
  input[type='submit']:hover {
    background-color: #91d629;
    box-shadow: 0 0 15px -3px gray;
    cursor: pointer;
  }

  .searchNums {
    color: #808080;
    font-size: 80%;
    display: flex;
    align-items: center;
  }

  ul {
    padding-left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .search-results {
    width: 100%;
    margin: 10px 0;
  }

  .nav-btn-container {
    padding-right: 25px;
    display: flex;
    justify-content: flex-end;
  }

  .nav-btn {
    margin: 0 10px;
    padding: 0;
    border: none;
    cursor: pointer;
    background-color: transparent;
  }

  .nav-btn-img {
    width: 20px;
    transition: 0.2s;
  }

  .nav-btn-img:hover {
    filter: drop-shadow(0 0 2px grey);
  }
</style>