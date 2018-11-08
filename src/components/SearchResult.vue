<template>
    <li>
      <p class="order-num">{{ this.num }}</p>
      <div class="img-container">
        <a :href='url' target='_blank'><img :src="image"/></a>
      </div>
      <div class='info'>
        <p class='title'>{{ this.title }}</p>
        <p class="author">by {{ this.author}} - {{ this.year }}</p>
        <p class="ratings">{{ this.rating }} avg rating</p>
      </div>
      <div class="details">
        <button v-if='this.series === true' class="series-btn" @click='findSeries'> Series</button>
        <p v-if='this.future === true'>Coming on {{ this.releaseString(this.release) }}</p>
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
    title: String,
    image: String,
    rating: Number,
    year: Number,
    url: String,
    series: Boolean,
    authorId: Number,
    id: Number,
    num: Number,
    release: Date,
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
    releaseString (date) {
      console.log(date)
      const day = date.getUTCDate()
      const locale = 'en-us'
      const month = date.toLocaleString(locale, { month: 'short' })
      const year = date.getUTCFullYear()
      return day + ' ' + month + ' ' + year
    },
    findSeries () {
      const sTitle = this.seriesTitle()
      this.$emit('findSeries', this.authorId, sTitle)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li {
    border-bottom: 1px solid #dfdfdf;
    padding: 10px 0;
    display: grid;
    grid-template: 90px / 30px 70px 1fr 1fr 140px;
    width: 100%;
    box-sizing: border-box;
  }

  .order-num {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 80%;
    color: gray;
  }

  .img-container {
    padding-top: 6px;
    text-align: center;
  }

  img {
    object-fit: contain;
    max-height: 75px;
    width: 50px;
  }

  .info {
    position: relative;
    padding-left: 15px;
  }

  .title {
    font-weight: bold;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 330px;
  }

  .author {
    margin: 0;
    font-size: 80%;
  }

  .ratings {
    font-size: 80%;
    color: gray;
    margin-top: 7px;
  }

  button {
    height: 30px;
    margin: 15px;
    align-self: flex-start;
  }

  .series-btn {
    background-color: greenyellow;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    margin: 0;
    width: 60px;
  }

  .series-btn:hover {
    background-color: #91d629;
    box-shadow: 0 0 15px -3px gray;
  }

  .heart-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .heart {
    height: 30px;
    width: 30px;
    cursor: pointer;
    transition: 0.2s;
  }

  .heart:hover {
    filter: drop-shadow(0 0 2px #f55641);
  }

</style>
