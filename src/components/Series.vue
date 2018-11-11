<template>
  <div class="container">
    <h3>Series view</h3>
    <div class="search-results">
      <ul>
        <seriesresult v-for="(s, index) in list" 
          v-on:releaseString="releaseString"
          v-bind:today="today"
          v-bind:num="index"
          v-bind:authorId="s.best_book.author.id"
          v-bind:key='s.id'
          v-bind:author="s.best_book.author.name"
          v-bind:title="decodeTitle(s.best_book.title)"
          v-bind:image="s.best_book.image_url "
          v-bind:rating="+((s.ratings_sum / s.ratings_count).toFixed(2))"
          v-bind:year="s.original_publication_year || 0"
          v-bind:url="'https://www.goodreads.com/book/show/' + s.best_book.id"
          v-bind:position="s.position"
          v-bind:release="releaseDate(s.original_publication_year, s.original_publication_month, s.original_publication_day)"
          v-bind:releaseString="releaseString(s.original_publication_year, s.original_publication_month, s.original_publication_day)"
          />
      </ul>
    </div>
  </div>
</template>

<script>
import seriesresult from './SeriesResult'
export default {
  name: 'series',
  components: {
    seriesresult
  },
  props: {
    list: Array,
    today: Date
  },
  data () {
    return {
    }
  },
  methods: {
    releaseDate (year, month, day) {
      return this.$parent.releaseDate(year, month, day)
    },
    releaseString (year, month, day) {
      return this.$parent.releaseString(year, month, day)
    },
    decodeTitle (title) {
      return title.replace(/&amp;/g, '&')
    }
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