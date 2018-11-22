<template>
  <div class="container">
    <h3>Series view</h3>
    <p><span class="author-link" @click='authorBooks'>{{ authorName }}</span> - {{ seriesTitle }}</p>
    <div class="search-results">
      <ul>
        <seriesresult v-for="(s, index) in displayList"
          v-bind:key='s.id'
          v-bind:num="index"
          v-bind:author="s.best_book.author.name"
          v-bind:title="s.best_book.title_without_serie"
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
import { mapState, mapActions } from 'vuex'
import seriesresult from './SeriesResult'

export default {
  name: 'series',
  components: {
    seriesresult
  },
  computed: mapState([
    'displayList',
    'authorName',
    'authorId',
    'seriesTitle'
  ]),
  data () {
    return {
      author: null,
      serie: null
    }
  },
  created () {
  },
  methods: {
    ...mapActions(['fetch_new_authorBooks']),
    authorBooks () {
      this.fetch_new_authorBooks([this.authorName, this.authorId])
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