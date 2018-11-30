<template>
  <div class="container">
    <h3>Series view</h3>
    <p><span class="author-link" @click='authorBooks'>{{ authorName }}</span> - {{ seriesTitle }}</p>
    <div class="search-results">
      <ul>
        <booklist v-for="(b, index) in displayList"
          v-bind:key="b.id"
          v-bind:shelf="b.shelf"
          v-bind:owned="b.owned"
          v-bind:num="index"
          v-bind:book="b"
          v-bind:author="b.author"
          v-bind:id="b.id"
          v-bind:title="b.title_without_serie || b.title"
          v-bind:image="b.imgUrl"
          v-bind:rating="b.rating"
          v-bind:year="b.displayYear"
          v-bind:goodreadsUrl="b.goodreadsUrl"
          v-bind:position="b.position"
          v-bind:future="b.future"
          v-bind:release="b.displayDateString"
          />
      </ul>
    </div>
  </div>
</template>

<script>
import booklist from './BookList'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('book/newBooks')

export default {
  name: 'series',
  components: {
    booklist
  },
  computed: {
    ...mapState({
      displayList: state => state.displayList,
      authorName: state => state.authorName,
      authorId: state => state.authorId,
      seriesTitle: state => state.seriesTitle
    })
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