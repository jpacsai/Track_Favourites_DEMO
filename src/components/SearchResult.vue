<template>
    <li>
      <div class="img-container">
        <img :src="image"/>
      </div>
      <div class='details'>
        <p class='title'>{{ this.title }}</p>
        <p class="author">by {{ this.author}}</p>
        <p class="ratings">{{ this.rating }} avg rating</p>
      </div>
      <button>Details</button>
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
    rating: Number
  },
  data () {
    return {
    }
  },
  methods: {
    getISBN () {
      const arr = this.searchResult
      arr.forEach(b => {
        console.log(b.best_book.title)
      })
    },
    getBookDetails () {
      fetch('https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&country=GB&key=' + keys.googleBooks)
        .then(data => data.json())
        .then(data => {
          console.log(data)
        })
        .catch(function (error) {
          console.log('Looks like there was a problem: \n', error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li {
    border: 1px solid #dfdfdf;
    padding: 10px;
    display: grid;
    grid-template: 120px / 70px 200px 100px;
  }

  .img-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .details {
    padding: 15px;
  }

  .title {
    font-weight: bold;
    margin: 0;
  }

  button {
    height: 30px;
    margin: 15px;
    align-self: flex-start;
  }

  .ratings {
    font-size: 80%;
    color: gray;
  }
</style>
