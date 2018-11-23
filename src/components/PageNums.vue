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

export default {
  name: 'pagenumbers',
  computed: mapState([
    'view',
    'page',
    'allPage'
  ]),
  methods: {
    ...mapActions([
      'pageForward',
      'pageBackward'
    ]),
    pageForw () {
      this.pageForward()
    },
    pageBackw () {
      this.pageBackward()
    }
  }
}
</script>

<style scoped>
  .hidden {
    visibility: hidden;
  }
</style>