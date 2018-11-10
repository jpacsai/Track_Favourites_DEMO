<template>
  <div class="container">
    <h3>Series view</h3>
    <div class="search-results">
      <ul> <!--
        <seriesResult v-for="(s, index) in searchResult" 
          v-on:findSeries="findSeries"
          v-bind:num="index"
          v-bind:authorId="s.best_book.author.id"
          v-bind:key='s.id'
          v-bind:author="s.best_book.author.name"
          v-bind:title="s.best_book.title"
          v-bind:image="s.best_book.image_url "
          v-bind:rating="+((s.ratings_sum / s.ratings_count).toFixed(2))"
          v-bind:year="s.original_publication_year || 0"
          v-bind:url="'https://www.goodreads.com/book/show/' + s.best_book.id"
          v-bind:series="s.best_book.title.includes('(')"
          v-bind:seriesView="seriesView"
          v-bind:release="releaseDate(s.original_publication_year, s.original_publication_month, s.original_publication_day)"
          v-bind:future="releaseDate(s.original_publication_year, s.original_publication_month, s.original_publication_day) > today"/> -->
      </ul>
    </div>
  </div>
</template>

<script>
// import searchresult from './SearchResult'
// import api from '@/api'
// import keys from '../../apiKeys.js'
// const parser = require('fast-xml-parser')

export default {
  name: 'series',
  components: {
    // searchresult
  },
  props: {
    list: Array
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .container {
    max-width: 1100px;
    margin-top: 20px;
    padding: 0 0 50px 0;
  }
</style>