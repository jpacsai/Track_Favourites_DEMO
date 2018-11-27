<template>
  <div class="container">
    <h3>Search results</h3>
    <div class="search-results">
      <ul>
        <booklist v-for="(b, index) in displayList"
          v-bind:key="b.id"
          v-bind:book="b"
          v-bind:author="b.author"
          v-bind:authorid="b.authorId"
          v-bind:title="b.title"
          v-bind:serieTitle="b.serieTitle"
          v-bind:image="b.imgUrl"
          v-bind:rating="b.rating"
          v-bind:year="b.displayYear"
          v-bind:url="b.url"
          v-bind:series="b.serie"
          v-bind:id="b.id"
          v-bind:num="index"
          v-bind:release="b.displayDateString"
          v-bind:future="b.future" />          
      </ul>
    </div>

  </div>
</template>

<script>
import booklist from './BookList'
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('book/newBooks')

export default {
  name: 'search',
  components: {
    booklist
  },
  computed: {
    ...mapState({
      displayList: state => state.displayList
    })
  }
}
</script>