<template>
    <li :class="{ future: future }" class="book_li">
      <p class="order-num">{{ this.num }}</p>
      <div class="img-container">
        <a :href='url' target='_blank'><img :src="image"/></a>
      </div>
      <div class='info'>
        <p class='title'>{{ this.title }}</p>
        <p v-if="view === 'search'" class="author">by <span class='author-link' @click='authorBooks'>{{ this.author }}</span> - {{ this.year > 0 ? this.year : 'unknown' }}</p>
        <p class="ratings">{{ this.rating }} avg rating</p>
      </div>
      <div class="details">
        <button v-if="this.series === true && view !== 'series'" class="series-btn" @click='searchSeries'> Series</button>
        <p v-if="view === 'series'" class="serie-position">BOOK <span>{{ this.position }}</span></p>
        <p class="future-release" v-if='this.future === true'>Coming on {{ this.release }}</p>
      </div>
      <div class="heart-container">
        <img class='heart' v-if='this.liked === false' src="../assets/heart_empty.svg" alt="heart" @click='likeToggle'>
        <img class='heart' v-if='this.liked === true' src="../assets/heart_red.svg" alt="heart" @click='likeToggle'>
      </div>
    </li>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'booklist',
  computed: mapState([
    'view'
  ]),
  props: {
    num: Number,
    id: Number,
    title: String,
    serieTitle: String,
    image: String,
    rating: Number,
    year: Number,
    url: String,
    series: Boolean,
    release: String,
    future: Boolean,
    author: String,
    authorId: Number,
    position: String
  },
  data () {
    return {
      liked: false
    }
  },
  methods: {
    ...mapActions(['search_series', 'fetch_new_authorBooks']),
    likeToggle () {
      this.liked = !this.liked
    },
    searchSeries () {
      this.search_series([this.id, this.serieTitle, this.author, this.authorId])
    },
    authorBooks () {
      this.fetch_new_authorBooks([this.author, this.authorId])
    }
  }
}
</script>
