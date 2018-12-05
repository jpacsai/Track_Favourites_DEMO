<template>
  <div>
    <div class="top">
      <form @submit.prevent="searchBook" class="book_search-form">
        <input type="text" v-model='newSearch' required class="book_search-input" />
        <input type='submit' value="Search" class="book_search-submit" />
      </form>
      <b-alert :show="loading" variant="info">Loading...</b-alert>
      <p class="book_searchNums" v-if="this.allResults > 0 && loading === false">
        <span>results from {{ this.resultsFrom}} to {{ this.resultsTo }} out of {{ this.allResults }}</span>
      </p>
    </div>
    <search v-if="view === 'search' && loading === false && displayList.length > 0" />
    <series v-if="view === 'series' && loading === false" />
    <author v-if="view === 'author' && loading === false" />

    <div v-if="view === 'error'" class="error"><p>{{ this.error }}</p></div>

    <pagenumbers v-if="displayList.length > 0 && view !== 'series' && loading === false" />

  </div>
</template>

<script>
import series from './Series'
import search from './Search'
import author from './Author'
import pagenumbers from './PageNums'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'newbooks',
  components: {
    series,
    search,
    author,
    pagenumbers
  },
  computed: {
    ...mapState('book/library', {
      library: state => state.myBooks
    }),
    ...mapState('book/newBooks', {
      loading: state => state.loading,
      view: state => state.view,
      error: state => state.error,
      displayList: state => state.displayList,
      resultsFrom: state => state.resultsFrom,
      resultsTo: state => state.resultsTo,
      allResults: state => state.allResults
    })
  },
  data () {
    return {
      newSearch: ''
    }
  },
  methods: {
    ...mapActions('book/newBooks', [
      'new_search',
      'search_series',
      'set_error'
    ]),
    searchBook () {
      this.new_search([this.newSearch, this.library])
      this.newSearch = ''
    }
  }
}
</script>
