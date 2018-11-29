<template>
  <div class="container">
    <h3>Author view</h3>
    <p>{{ authorName }}</p>
    <div class="search-results">
      <ul>
        <booklist v-for="(b, index) in displayList"
          v-bind:key="b.id"
          v-bind:shelf="b.shelf"
          v-bind:num="index"
          v-bind:book="b"
          v-bind:id="b.id"
          v-bind:title="b.title"
          v-bind:serieTitle="b.serieTitle"
          v-bind:image="b.imgUrl"
          v-bind:rating="b.rating"
          v-bind:year="b.displayYear"
          v-bind:goodreadsUrl="b.goodreadsUrl"
          v-bind:series="b.serie"
          v-bind:release="b.displayDateString"
          v-bind:future="b.future"/>
      </ul>
    </div>
  </div>
</template>

<script>
import booklist from './BookList'
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('book/newBooks')

export default {
  name: 'author',
  components: {
    booklist
  },
  computed: {
    ...mapState({
      displayList: state => state.displayList,
      authorName: state => state.authorName
    })
  }
}
</script>