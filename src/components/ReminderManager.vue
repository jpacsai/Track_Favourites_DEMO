<template>
  <div class="container book">
    <header>
      <h1 class="header">Reminder Manager</h1>
    </header>

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
// import { mapState, mapActions, mapMutations } from 'vuex'

// const { mapState, mapActions } = createNamespacedHelpers('book/newBooks')

export default {
  name: 'ReminderManager',
  components: {},
  computed: {
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {/*
    ...mapActions('book/newBooks', [
      'set_today',
      'reset_search'
    ]),
    ...mapMutations('book', [
      'SET_SECTION'
    ]),
    setSection (payload) {
      this.SET_SECTION(payload)
    },
    sectionClass (btn) {
      return this.section === btn ? 'section-tab_active' : ''
    },
    setLibrary () {
      this.setSection('library')
      this.reset_search()
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
    }, */
  }
}
</script>
