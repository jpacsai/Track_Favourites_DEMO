<template>
    <div class="nav-btn-container">
      <button class="nav-btn" :class="{ hidden: this.page === 1 }" @click="pageBackw">
        <img class='nav-btn-img' src='../assets/arrow_backw.svg'></button>
      <span>{{ this.page }}</span>
      <button :class="{ hidden: this.page === this.allPage }" class="nav-btn" @click="pageForw">
        <img class='nav-btn-img' src='../assets/arrow_forw.svg'>
      </button>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

// const { mapState, mapActions } = createNamespacedHelpers('book/newBooks')

export default {
  name: 'pagenumbers',
  computed: {
    ...mapState('book/newBooks', [
      'view',
      'page',
      'allPage'
    ]),
    ...mapState('book/library', {
      bookList: state => state.myBooks
    })
  },
  methods: {
    ...mapActions('book/newBooks', [
      'pageForward',
      'pageBackward'
    ]),
    pageForw () {
      this.pageForward(this.bookList)
    },
    pageBackw () {
      this.pageBackward(this.bookList)
    }
  }
}
</script>

<style scoped>
  .hidden {
    visibility: hidden;
  }
</style>