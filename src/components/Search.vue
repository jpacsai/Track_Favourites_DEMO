<template>
  <div class="container">
    <h3>Search results</h3>
    <div class="search-results">
      <booklist v-bind:list="displayList"/>
    </div>

  </div>
</template>

<script>
import booklist from './BookList'
import { mapState } from 'vuex'

export default {
  name: 'search',
  components: {
    booklist
  },
  computed: {
    ...mapState('book/newBooks', {
      displayList: state => state.displayList
    })
  }
}
</script>