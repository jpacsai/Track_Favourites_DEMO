<template>
  <div class="container book">
    <h1 class="header">Book Manager</h1>
    <div class="top">
      <form @submit.prevent="searchBook" class="book_search-form">
        <input type="text" v-model='newSearch' required class="book_search-input"/>
        <input type='submit' value="Search" class="book_search-submit"/>
      </form>
      <p class="book_searchNums" v-if="this.allResult > 0">
        <span>results from {{ this.resultsFrom}} to {{ this.resultsTo }} out of {{ this.allResult }}</span>
      </p>
    </div>

    <search
      v-if="view === 'search'"
      class="search-results" />
    <series
      v-if="view === 'series'"
      v-bind:displayAuthor="displayAuthor"
      v-bind:serieTitle="serieTitle"
      v-bind:authorId="displayAuthorId"
      v-bind:list="searchResult" />
    <author
      v-if="view === 'author'"
      v-bind:displayAuthor="displayAuthor"
      v-bind:list="searchResult" />

    <div class="error" v-if="view === 'error'">
      <p>{{ this.error }}</p>
    </div>

    <div class="nav-btn-container" v-if="this.view === 'author'">
      <button class="nav-btn" :class="{ hidden: this.page === 1 }" @click="pageBackward">
        <img class='nav-btn-img' src='../assets/arrow_backw.svg'></button>
      <span>{{ this.page }}</span>
      <button :class="{ hidden: this.page === this.allPage }" class="nav-btn" @click="pageForward">
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
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    series,
    search,
    author
  },
  computed: mapState([
    'view',
    'error'
  ]),
  data () {
    return {
      newSearch: '',
      loading: false,
      books: [],
      model: {},
      page: 1,
      allPage: 0,
      resultsFrom: 0,
      resultsTo: 0,
      allResult: 0,
      searchResult: [],
      displayAuthor: null,
      displayAuthorId: null,
      serieTitle: null,
      herokuNoCors: 'https://cors-escape.herokuapp.com/'
    }
  },
  created () {
    const now = new Date()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    this.set_today(now)
  },
  /*
  async created () {
    this.refreshBooks()
  }, */
  methods: {
    ...mapActions(['set_today', 'search_book', 'search_series', 'set_error']),
    searchBook () {
      this.search_book(this.newSearch)
      this.newSearch = ''
    },
    error_null () {
      this.error = null
    },
    checkSearchResults (arr) {
      const checkedArr = arr.filter(obj => obj.original_publication_year !== '')
      return checkedArr
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
    setPageAuthor (arr) {
      const from = 1 + (this.page - 1) * 30
      this.resultsFrom = from
      this.resultsTo = from + arr.length - 1
    },
    /* newSearch () {
      this.page = 1
      this.displayAuthor = null
      this.displayAuthorId = null
      this.serieTitle = null
      this.searchResult = []
      if (this.view !== 'search') {
        this.viewState_search()
      }
      this.searchBooks()
    }, */
    pageForward () {
      if (this.page < this.allPage) {
        this.page++
        if (this.view === 'search') {
          this.searchBooks()
        } else if (this.view === 'author') {
          this.authorBooks(this.displayAuthorId)
        }
        this.scrollUp()
      }
    },
    pageBackward () {
      if (this.page > 1) {
        this.page--
        if (this.view === 'search') {
          this.searchBooks()
        } else if (this.view === 'author') {
          this.authorBooks(this.displayAuthorId)
        }
        this.scrollUp()
      }
    },
    scrollUp () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
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
  .hidden {
    visibility: hidden;
  }
</style>