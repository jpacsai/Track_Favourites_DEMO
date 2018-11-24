<template>
  <div class="container">
    <h3>Author view</h3>
    <p>{{ authorName }}</p>
    <div class="search-results">
      <ul>
        <booklist v-for="(s, index) in displayList"
          v-bind:key='s.id'
          v-bind:num="index"
          v-bind:id="s.id"
          v-bind:title="s.title"
          v-bind:serieTitle="s.serie.serieTitle"
          v-bind:image="s.imgUrl"
          v-bind:rating="s.rating"
          v-bind:year="s.release.displayYear"
          v-bind:url="s.url"
          v-bind:series="s.serie.serie"
          v-bind:release="s.release.string"
          v-bind:future="s.future"/>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import booklist from './BookList'

export default {
  name: 'author',
  components: {
    booklist
  },
  computed: mapState([
    'displayList',
    'authorName'
  ])
}
</script>