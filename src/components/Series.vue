<template>
  <div class="container">
    <h3>Series view</h3>
    <div class="search-results">
      <ul>
        <seriesresult v-for="(s, index) in list" 
          v-bind:num="index"
          v-bind:authorId="s.best_book.author.id"
          v-bind:key='s.id'
          v-bind:author="s.best_book.author.name"
          v-bind:title="s.best_book.titleDecoded"
          v-bind:image="s.best_book.image_url "
          v-bind:rating="+((s.ratings_sum / s.ratings_count).toFixed(2))"
          v-bind:year="s.original_publication_year || 0"
          v-bind:url="'https://www.goodreads.com/book/show/' + s.best_book.id"
          v-bind:position="s.position"
          v-bind:future="s.future"
          v-bind:release="s.release"
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