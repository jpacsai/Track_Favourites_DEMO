<template>
  <div class="container">
    <h3>Author view</h3>
    <p>{{ authorName }}</p>
    <div class="search-results">
      <ul>
        <booklist v-bind:list="displayList"/>
      </ul>
    </div>
  </div>
</template>

<script>
import booklist from './BookList'
import { mapState } from 'vuex'

export default {
  name: 'author',
  components: {
    booklist
  },
  computed: {
    ...mapState('book/newBooks', {
      displayList: state => state.displayList,
      authorName: state => state.authorName
    })
  }
}
</script>