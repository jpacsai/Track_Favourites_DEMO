<template>
  <div class="container">
    <h3>Author view</h3>
    <p>{{ this.list.length }} book</p>
    <div class="search-results">
      <ul>
        <searchresult v-for="(s, index) in list" 
          v-on:findSeries="findSeries"
          v-on:authorBooks="authorBooks"
          v-bind:num="index"
          v-bind:id="s.id"
          v-bind:key='s.id'
          v-bind:author="s.authors.author.name"
          v-bind:authorId="s.authors.author.id"
          v-bind:title="s.title"
          v-bind:image="s.small_image_url"
          v-bind:rating="s.average_rating"
          v-bind:year="s.publication_year || 0"
          v-bind:url="'https://www.goodreads.com/book/show/' + s.authors.id"
          v-bind:series="s.serie"
          v-bind:release="s.release"
          v-bind:future="s.future"/>
      </ul>
    </div>
  </div>
</template>

<script>
import searchresult from './SearchResult'
export default {
  name: 'author',
  components: {
    searchresult
  },
  props: {
    list: Array
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
    authorBooks (authorId) {
      this.$parent.authorBooks(authorId)
    }
  }
}
</script>