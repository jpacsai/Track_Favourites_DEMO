<template>
    <li :class="{ future: future }" class="book_li">
      <p class="order-num">{{ this.num }}</p>
      <div class="img-container">
        <a :href='url' target='_blank'><img :src="image"/></a>
      </div>
      <div class='info'>
        <p class='title'>{{ this.title }}</p>
        <p>{{ this.year > 0 ? this.year : 'unknown' }}</p>
        <p class="ratings">{{ this.rating }} avg rating</p>
      </div>
      <div class="details">
        <p class="serie-position">BOOK <span>{{ this.position }}</span></p>
        <p class="future-release" v-if="this.future === true">Coming on {{ this.release }}</p>
      </div>
      <div class="heart-container">
        <img class='heart' v-if='this.liked === false' src="../assets/heart_empty.svg" alt="heart" @click='likeToggle'>
        <img class='heart' v-if='this.liked === true' src="../assets/heart_red.svg" alt="heart" @click='likeToggle'>
      </div>
    </li>
</template>

<script>
// import keys from '../../apiKeys.js'

export default {
  name: 'seriesresult',
  props: {
    author: String,
    title: String,
    image: String,
    rating: Number,
    year: Number,
    url: String,
    num: Number,
    future: Boolean,
    release: String,
    position: String
  },
  data () {
    return {
      liked: false
    }
  },
  methods: {
    likeToggle () {
      this.liked = !this.liked
    }
  }
}
</script>