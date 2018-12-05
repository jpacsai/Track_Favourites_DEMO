<template>
  <ul>
    <book v-for="(b, index) in list"
      v-bind:key="b.id"
      v-bind:shelf="b.shelf"
      v-bind:owned="b.owned"
      v-bind:book="b"
      v-bind:author="b.author"
      v-bind:authorid="b.authorId"
      v-bind:title="b.title_without_serie"
      v-bind:serieTitle="b.serieTitle"
      v-bind:serieDisplay="b.serieDisplay"
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
</template>

<script>
import book from './Book'
import { mapState } from 'vuex'

export default {
  name: 'booklist',
  components: {
    book
  },
  props: {
    list: Array
  },
  computed: {
    ...mapState('book/newBooks', {
      authorName: state => state.authorName
    })
  }
}
</script>
