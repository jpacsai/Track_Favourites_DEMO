<template>
  <div class="container">
    <h3>Search results</h3>
    <div class="search-results">
      <ul>
        <searchresult v-for="(s, index) in displayList" 
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
import { mapState } from 'vuex'
import searchresult from './SearchResult'

export default {
  name: 'search',
  components: {
    searchresult
  },
  props: {
    search: String
  },
  computed: mapState([
    'displayList'
  ]),
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
    findSeries (author, title) {
      this.$parent.findSeries(author, title)
    },
    authorDetails (name, authorId) {
      this.$parent.authorDetails(name, authorId)
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