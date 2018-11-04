<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Book Manager</h1>
    <form @submit.prevent="searchBooks">
      <input type="text" />
      <button type='submit' @click="searchBooks">Search</button>
    </form>
    <div class="search-results"></div>
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
    </b-row>
  </div>
</template>

<script>
import api from '@/api'
import keys from '../../apiKeys.js'
const parser = require('fast-xml-parser')

export default {
  data () {
    return {
      loading: false,
      books: [],
      model: {}
    }
  },
  async created () {
    this.refreshBooks()
  },
  methods: {
    searchBooks () {
      fetch(
        'https://cors-escape.herokuapp.com/https://www.goodreads.com/search/index.xml?key=' +
          keys.bookKey +
          '&q=Ender%27s+Game'
      )
        .then(data => data.blob())
        .then(data => {
          const reader = new FileReader()
          reader.onload = function (e) {
            const text = reader.result
            var jsonObj = parser.parse(text)
            console.log(jsonObj)
          }
          reader.readAsText(data)
        })
        .catch(function (error) {
          console.log('Looks like there was a problem: \n', error)
        })
    },
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
    }
  }
}
</script>

<style scoped>
.search-results {
  width: 100%;
  min-height: 200px;
  margin: 10px 0;
  border: 1px solid #dfdfdf;
}
</style>