<template>
  <div>
    <h2>My Library</h2>
    <div class="search-results">
      <ul>
        <booklist v-for="(b, index) in bookList"
          v-bind:key="b.id"
          v-bind:book="b"
          v-bind:shelf="b.shelf"
          v-bind:owned="b.owned"
          v-bind:author="b.author"
          v-bind:authorid="b.authorId"
          v-bind:title="b.title"
          v-bind:serieTitle="b.serieTitle"
          v-bind:image="b.imgUrl"
          v-bind:rating="b.rating"
          v-bind:year="b.displayYear"
          v-bind:sourceUrl="b.sourceUrl"
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
// import { mapState, mapActions } from 'vuex'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('book/library')

export default {
  name: 'mylibrary',
  components: {
    booklist
  },
  computed: {
    ...mapState({
      bookList: state => state.myBooks
    })
  },
  data () {
    return {
      loading: false,
      model: {}
    }
  },
  async created () {
    this.refreshBooks()
  },
  methods: {
    ...mapActions([
      'refreshBooks'
    ])
  }
}
</script>
