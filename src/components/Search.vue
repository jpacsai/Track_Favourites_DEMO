<template>
  <div class="container">
    <h3>Search results</h3>
    <div class="search-results">
      <ul>
        <searchresult v-for="(s, index) in list" 
          v-on:authorDetails="authorDetails"
          v-bind:num="index"
          v-bind:id="s.id"
          v-bind:key='s.id'
          v-bind:author="s.best_book.author.name"
          v-bind:authorId="s.best_book.author.id"
          v-bind:title="s.best_book.titleDecoded"
          v-bind:image="s.best_book.small_image_url"
          v-bind:rating="s.average_rating"
          v-bind:year="s.original_publication_year || 0"
          v-bind:url="'https://www.goodreads.com/book/show/' + s.best_book.id"
          v-bind:series="s.serie"
          v-bind:release="s.release"
          v-bind:future="s.future"/>
      </ul>
    </div>

    <div class="nav-btn-container">
      <button class="nav-btn" @click="pageBackward">
        <img class='nav-btn-img' src='../assets/arrow_backw.svg'></button>
      <span>{{ this.page }}</span>
      <button class="nav-btn" @click="pageForward">
        <img class='nav-btn-img' src='../assets/arrow_forw.svg'>
      </button>
    </div>

  </div>
</template>

<script>
import keys from '../../apiKeys.js'
import searchresult from './SearchResult'
const parser = require('fast-xml-parser')

export default {
  name: 'search',
  components: {
    searchresult
  },
  props: {
    search: String
  },
  data () {
    return {
      list: [],
      page: 1,
      allPage: 1,
      allResult: 0,
      resultsFrom: 1,
      resultsTo: 1
    }
  },
  methods: {
    searchBooks () {
      console.log('FETCH - search books')
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
            this.searchResult = this.parseArr_Search(res)
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
    findSeries (author, title) {
      this.$parent.findSeries(author, title)
    },
    authorDetails (name, authorId) {
      this.$parent.authorDetails(name, authorId)
    },
    handleUpload (data) {
      this.$parent.handleUpload(data)
    },
    error_noSearchResult () {
      this.error = 'no_search'
    },
    parseArr (arr) {
      const parsed = arr.map(obj => {
        const year = obj.original_publication_year || 1900
        const month = obj.original_publication_month || 1
        const day = obj.original_publication_day || 1
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
    }
  }
}
</script>