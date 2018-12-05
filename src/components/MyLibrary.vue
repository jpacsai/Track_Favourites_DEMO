<template>
  <div>
    <h2>My Library</h2>
    <div class="search-results">
      <booklist v-bind:list="library"/>
    </div>
  </div>
</template>

<script>
import booklist from './BookList'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'mylibrary',
  components: {
    booklist
  },
  async created () {
    this.refreshBooks()
  },
  computed: {
    ...mapState('book/library', {
      library: state => state.myBooks
    })
  },
  methods: {
    ...mapActions('book/library', [
      'refreshBooks'
    ])
  }
}
</script>
