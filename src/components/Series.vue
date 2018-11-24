<template>
  <div class="container">
    <h3>Series view</h3>
    <p><span class="author-link" @click='authorBooks'>{{ authorName }}</span> - {{ seriesTitle }}</p>
    <div class="search-results">
      <ul>
        <booklist v-for="(b, index) in displayList"
          v-bind:key='b.id'
          v-bind:num="index"
          v-bind:author="b.author"
          v-bind:title="b.serie.title_without_serie"
          v-bind:image="b.imgUrl"
          v-bind:rating="b.rating"
          v-bind:year="b.release.displayYear"
          v-bind:url="b.url"
          v-bind:position="b.serie.position"
          v-bind:future="b.future"
          v-bind:release="b.release.string"
          />
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import booklist from './BookList'

export default {
  name: 'series',
  components: {
    booklist
  },
  computed: mapState([
    'displayList',
    'authorName',
    'authorId',
    'seriesTitle'
  ]),
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