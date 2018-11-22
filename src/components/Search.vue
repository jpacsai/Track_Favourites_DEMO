<template>
  <div class="container">
    <h3>Search results</h3>
    <div class="search-results">
      <ul>
        <searchresult v-for="(s, index) in displayList"
          v-bind:key='s.id'
          v-bind:author="s.best_book.author.name"
          v-bind:authorId="s.best_book.author.id"
          v-bind:title="s.best_book.titleDecoded"
          v-bind:serieTitle="s.best_book.title_serie"
          v-bind:image="s.best_book.small_image_url"
          v-bind:rating="s.average_rating"
          v-bind:year="s.original_publication_year || 0"
          v-bind:url="'https://www.goodreads.com/book/show/' + s.best_book.id"
          v-bind:series="s.serie"
          v-bind:id="s.id"
          v-bind:num="index"
          v-bind:release="s.release"
          v-bind:future="s.future" />          
      </ul>
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
  computed: mapState([
    'displayList'
  ])
}
</script>