<template>
    <li>
      <div class="img-container">
        <img :src="image"/>
      </div>
      <div class='details'>
        <p class='title'>{{ this.title }}</p>
        <p class="author">by {{ this.author}} - {{ this.year }}</p>
        <p class="ratings">{{ this.rating }} avg rating</p>
      </div>
      <div>
        <button @click='getBookDetails'>Details</button>
        <img class='heart' v-if='this.liked === false' src="../assets/heart_empty.svg" alt="heart" @click='likeToggle'>
        <img class='heart' v-if='this.liked === true' src="../assets/heart_red.svg" alt="heart" @click='likeToggle'>
      </div>
    </li>
</template>

<script>
import keys from '../../apiKeys.js'

export default {
  name: 'searchresult',
  props: {
    author: String,
    title: String,
    image: String,
    rating: Number,
    year: Number
  },
  data () {
    return {
      ISBN: '',
      liked: false
    }
  },
  methods: {
    getBookDetails () {
      fetch('https://www.googleapis.com/books/v1/volumes?q=' + this.author + ' ' + this.title + '&country=GB&key=' + keys.googleBooks)
        .then(data => data.json())
        .then(data => {
          const num = data.items[0].volumeInfo.industryIdentifiers[0].identifier
          this.ISBN = num
        })
        .catch(function (error) {
          console.log('Looks like there was a problem: \n', error)
        })
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
    padding: 10px;
    display: grid;
    grid-template: 90px / 70px 340px 140px;
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

  .details {
    position: relative;
    padding-left: 15px;
  }

  .title {
    font-weight: bold;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

  .heart {
    height: 30px;
    width: 30px;
  }

</style>
