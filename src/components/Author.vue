<template>
  <div class="container">
    <h3>Author view</h3>
    <p>{{ authorName }}</p>
    <div class="search-results">
      <ul>
        <authorresult v-for="(s, index) in displayList"
          v-bind:key='s.id'
          v-bind:num="index"
          v-bind:id="s.work.id"
          v-bind:title="s.titleDecoded"
          v-bind:serieTitle="s.title_serie"
          v-bind:image="s.small_image_url"
          v-bind:rating="s.average_rating"
          v-bind:year="s.publication_year || 0"
          v-bind:url="'https://www.goodreads.com/book/show/' + s.id"
          v-bind:series="s.serie"
          v-bind:release="s.release"
          v-bind:future="s.future"/>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import authorresult from './AuthorResult'

export default {
  name: 'author',
  components: {
    authorresult
  },
  computed: mapState([
    'displayList',
    'authorName'
  ])
}
</script>