<template>
  <div class="container">
    <h3>Author view</h3>
    <p>{{ author_name }} - {{ displayList.length }} {{ displayList.length > 1 ? 'books' : 'book' }}</p>
    <div class="search-results">
      <ul>
        <authorresult v-for="(s, index) in displayList" 
          v-on:findSeries="findSeries"
          v-on:authorBooks="authorBooks"
          v-bind:num="index"
          v-bind:id="s.work.id"
          v-bind:key='s.work.id'
          v-bind:author="s.authors.author.name"
          v-bind:authorId="s.authors.author.id"
          v-bind:title="s.title"
          v-bind:image="s.small_image_url"
          v-bind:rating="s.average_rating"
          v-bind:year="s.publication_year || 0"
          v-bind:url="'https://www.goodreads.com/book/show/' + s.authors.author.id"
          v-bind:series="s.serie"
          v-bind:release="s.release"
          v-bind:future="s.future"/>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import authorresult from './AuthorResult'

export default {
  name: 'author',
  components: {
    authorresult
  },
  computed: mapState([
    'displayList',
    'author_name'
  ]),
  props: {
    list: Array,
    displayAuthor: String
  },
  data () {
    return {}
  },
  created () {
  },
  methods: {
    findSeries (author, title) {
      this.$parent.findSeries(author, title)
    },
    authorBooks (author) {
      this.$parent.authorBooks(author)
    }
  }
}
</script>