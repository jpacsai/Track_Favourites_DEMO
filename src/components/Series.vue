<template>
  <div class="container">
    <h3>Series view</h3>
    <p><span class="author-link" @click='authorBooks'>{{ authorName }}</span> - {{ seriesTitle }}</p>
    <div class="search-results">
      <booklist v-bind:list="displayList"/>
    </div>
  </div>
</template>

<script>
import booklist from './BookList'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'series',
  components: {
    booklist
  },
  computed: {
    ...mapState('book/library', {
      library: state => state.myBooks
    }),
    ...mapState('book/newBooks', {
      displayList: state => state.displayList,
      authorName: state => state.authorName,
      authorId: state => state.authorId,
      seriesTitle: state => state.seriesTitle
    })
  },
  methods: {
    ...mapActions('book/newBooks', ['fetch_new_authorBooks']),
    authorBooks () {
      this.fetch_new_authorBooks([this.authorName, this.authorId, this.library])
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