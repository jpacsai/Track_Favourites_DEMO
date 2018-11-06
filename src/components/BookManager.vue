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
    
    <div class="search-results">
      <ul>
        <searchresult v-for="s in searchResult" 
          v-bind:key='s.id'
          v-bind:author="s.best_book.author.name"
          v-bind:title="s.best_book.title"
          v-bind:image="s.best_book.small_image_url"
          v-bind:rating="s.average_rating"
          v-bind:year="s.original_publication_year"
          v-bind:url="'https://www.goodreads.com/book/show/' + s.best_book.id"
          v-bind:series="s.best_book.title.includes('(')"/>
      </ul>
    </div>
    <div class="nav-btn-container" v-if="this.allResult !== 0">
      <button class="nav-btn" @click="pageBackward">«</button>
      <span>{{ this.page }}</span>
      <button class="nav-btn" @click="pageForward">»</button>
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
import searchresult from './SearchResult'
// import api from '@/api'
import keys from '../../apiKeys.js'
const parser = require('fast-xml-parser')

export default {
  components: {
    searchresult
  },
  data () {
    return {
      loading: false,
      books: [],
      model: {},
      search: '',
      page: 1,
      allPage: 0,
      resultsFrom: 0,
      resultsTo: 0,
      allResult: 0,
      searchResult: []
    }
  }, /*
  async created () {
    this.refreshBooks()
  }, */
  methods: {
    newSearch () {
      this.page = 1
      this.searchResult = []
      this.searchBooks()
    },
    searchBooks () {
      fetch(
        'https://cors-escape.herokuapp.com/https://www.goodreads.com/search/index.xml?key=' +
          keys.bookKey + '&q=' + this.search + '&page=' + this.page
      )
        .then(data => data.blob())
        .then(data => {
          const text = this.handleUpload(data)
          return text
        })
        .then(text => {
          var jsonObj = parser.parse(text)
          const allResults = jsonObj.GoodreadsResponse.search['total-results']
          this.allResult = allResults
          this.resultsFrom = jsonObj.GoodreadsResponse.search['results-start']
          this.resultsTo = jsonObj.GoodreadsResponse.search['results-end']
          this.allPage = Math.ceil(allResults / 20)
          const res = jsonObj.GoodreadsResponse.search.results.work
          console.log(res)
          if (Array.isArray(res) === true) {
            this.searchResult = res
          } else {
            this.searchResult.push(res)
          }
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
  }

  .top {
    
  }

  form {
    display: grid;
    grid-template-columns: 1fr 90px;
  }
  
  input[type='text'] {
    padding-left: 10px;
  }

  input[type='submit'] {
    margin-left: 15px;
  }

  .searchNums {
    color: gray;
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
    padding-left: 60px;
  }

  .nav-btn {
    width: 60px;
  }
</style>