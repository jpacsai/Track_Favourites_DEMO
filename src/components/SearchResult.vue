<template>
    <li :class="{ future: future }" class="book_li">
      <p class="order-num">{{ this.num }}</p>
      <div class="img-container">
        <a :href='url' target='_blank'><img :src="image"/></a>
      </div>
      <div class='info'>
        <p class='title'>{{ this.title }}</p>
        <p class="author">by <span @click='authorDetails'>{{ this.author }}</span> - {{ this.year > 0 ? this.year : 'unknown' }}</p>
        <p class="ratings">{{ this.rating }} avg rating</p>
      </div>
      <div class="details">
        <button v-if='this.series === true && this.seriesView === false' class="series-btn" @click='findSeries'> Series</button>
        <p class="future-release" v-if='this.future === true'>Coming on {{ this.release }}</p>
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
  name: 'searchresult',
  props: {
    author: String,
    authorId: Number,
    title: String,
    image: String,
    rating: Number,
    year: Number,
    url: String,
    series: Boolean,
    seriesView: Boolean,
    id: Number,
    num: Number,
    release: String,
    future: Boolean
  },
  data () {
    return {
      ISBN: '',
      liked: false
    }
  },
  methods: {
    likeToggle () {
      this.liked = !this.liked
    },
    findSeries () {
      const sTitle = this.seriesTitle()
      this.$emit('findSeries', this.id, sTitle)
    },
    authorDetails () {
      this.$emit('authorDetails', this.authorId)
    },
    seriesTitle () {
      const start = this.title.search(/\(/) + 1
      const t = this.title.substring(start)
      const end = t.search(/[,#]/)
      return t.substring(0, end).trim()
    }
  }
}
</script>
