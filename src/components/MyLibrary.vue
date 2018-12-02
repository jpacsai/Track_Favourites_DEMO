<template>
  <div>
    <h2>My Library</h2>
    <div class="search-results">
      <ul>
        <booklist v-for="(b, index) in bookList"
          v-bind:key="b.id"
          v-bind:book="b"
          v-bind:shelf="b.shelf"
          v-bind:owned="b.owned"
          v-bind:author="b.author"
          v-bind:authorid="b.authorId"
          v-bind:title="b.title"
          v-bind:serieTitle="b.serieTitle"
          v-bind:image="b.imgUrl"
          v-bind:rating="b.rating"
          v-bind:year="b.displayYear"
          v-bind:sourceUrl="b.sourceUrl"
          v-bind:series="b.serie"
          v-bind:id="b.id"
          v-bind:num="index"
          v-bind:release="b.displayDateString"
          v-bind:future="b.future" />          
      </ul>
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
// import api from '@/api'
import booklist from './BookList'
// import { mapState, mapActions } from 'vuex'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('book/library')

export default {
  name: 'mylibrary',
  components: {
    booklist
  },
  computed: {
    ...mapState({
      bookList: state => state.myBooks
    })
  },
  data () {
    return {
      loading: false,
      model: {}
    }
  },
  async created () {
    this.refreshBooks()
  },
  methods: {
    ...mapActions([
      'refreshBooks'
    ])
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
