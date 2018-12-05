<template>
  <div>
    <div class="top">
      <form @submit.prevent="searchBook" class="book_search-form">
        <input type="text" v-model='newSearch' required class="book_search-input" />
        <input type='submit' value="Search" class="book_search-submit" />
      </form>
      <p class="book_searchNums" v-if="this.allResults > 0">
        <span>results from {{ this.resultsFrom}} to {{ this.resultsTo }} out of {{ this.allResults }}</span>
      </p>
    </div>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <search v-if="view === 'search'" />
    <series v-if="view === 'series'" />
    <author v-if="view === 'author'" />

    <div v-if="view === 'error'" class="error"><p>{{ this.error }}</p></div>

    <pagenumbers v-if="displayList.length > 0 && view !== 'series'" />

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
import pagenumbers from './PageNums'
// import api from '@/api'
import { mapState, mapActions } from 'vuex'
// import { createNamespacedHelpers } from 'vuex'

// const { mapState, mapActions } = createNamespacedHelpers('book/newBooks')

export default {
  name: 'newbooks',
  components: {
    series,
    search,
    author,
    pagenumbers
  },
  computed: {
    ...mapState('book/library', {
      library: state => state.myBooks
    }),
    ...mapState('book/newBooks', {
      loading: state => state.loading,
      view: state => state.view,
      error: state => state.error,
      displayList: state => state.displayList,
      resultsFrom: state => state.resultsFrom,
      resultsTo: state => state.resultsTo,
      allResults: state => state.allResults
    })
  },
  data () {
    return {
      newSearch: ''
    }
  },
  /*
  async created () {
    this.refreshBooks()
  }, */
  methods: {
    ...mapActions('book/newBooks', [
      'new_search',
      'search_series',
      'set_error'
    ]),
    searchBook () {
      this.new_search([this.newSearch, this.library])
      this.newSearch = ''
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
