<template>
    <li :class="{ future: future }" class="book_li">
      <p class="order-num">{{ this.num }}</p>
      <div class="img-container">
        <a :href='url' target='_blank'><img :src="image"/></a>
      </div>
      <div class='info'>
        <p class='title'>{{ this.title }}</p>
        <p v-if="view === 'search'" class="author">by <span class='author-link' @click='authorBooks'>{{ this.author }}</span> - {{ this.year > 0 ? this.year : 'unknown' }}</p>
        <div class="ratings">
          <p>{{ this.rating }} avg rating</p>
          <svg width="100px" height="25px" viewBox="0 0 100 25">
            <defs>
              <linearGradient id="star" x1="0" y1="0" x2="1" y2="0">
                <stop id="stop1" offset="50%" stop-color="purple"/>
                <stop id="stop2" offset="50%" stop-color="lightgrey" />
              </linearGradient>
            </defs>
            <path d="M9.29 1.1 L3.3 21.78 L19.8 8.58 L0 8.58 L16.5 21.78
                     M28.29 1.1 L22.3 21.78 L38.8 8.58 L19 8.58 L35.5 21.78
                     M47.29 1.1 L41.3 21.78 L57.8 8.58 L38 8.58 L54.5 21.78
                     M66.29 1.1 L60.3 21.78 L76.8 8.58 L57 8.58 L73.5 21.78
                     M85.29 1.1 L79.3 21.78 L95.8 8.58 L76 8.58 L92.5 21.78" fill="url(#star)" stroke="transparent" />
          </svg>
        </div> 
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
    'view',
    'authorName',
    'authorId'
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
    authorid: Number,
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
      this.search_series([this.id, this.serieTitle, this.authorName || this.author, this.authorId || this.authorid])
    },
    authorBooks () {
      this.fetch_new_authorBooks([this.author, this.authorid])
    }
  }
}
</script>
