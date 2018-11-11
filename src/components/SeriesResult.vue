<template>
    <li :class="{ future: future }">
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
        <p>BOOK {{ this.position }}</p>
        <p class="future-release" v-if="this.future === true">Coming on {{ this.releaseString }}</p>
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
    today: Date,
    author: String,
    title: String,
    image: String,
    rating: Number,
    year: Number,
    url: String,
    authorId: Number,
    id: Number,
    num: Number,
    release: Date,
    releaseString: String,
    position: String
  },
  data () {
    return {
      liked: false,
      future: false
    }
  },
  created () {
    this.future = this.setFuture(this.release, this.today)
  },
  methods: {
    setFuture (release, today) {
      return release > today
    },
    likeToggle () {
      this.liked = !this.liked
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
    grid-template: 90px / 30px 70px 1.5fr 1fr 140px;
    width: 100%;
    box-sizing: border-box;
  }

  .future {
    background-color: rgba(240, 128, 128, 0.17);
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
    max-width: 370px;
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

  .details {
    display: flex;
    flex-direction: column;
  }

  .future-release {
    background-color: rgba(240, 128, 128, 0.5);;
    font-size: 80%;
    align-self: flex-start;
    padding: 5px;
    border-radius: 3px;
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
