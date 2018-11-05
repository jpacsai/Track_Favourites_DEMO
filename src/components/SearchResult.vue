<template>
    <li>
      <img :src="image" />
      <div class='details'>
        <p class='title'>{{ this.title }}</p>
        <p class="author">{{ this.author}}</p>
      </div>
    </li>
</template>

<script>
export default {
  name: 'searchresult',
  props: {
    author: String,
    title: String,
    image: String
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li {
    border: 1px solid #dfdfdf;
    padding: 10px;
    display: flex;
  }

  img {
    margin-right: 10px;
  }

  .title {
    font-weight: bold;
  }
</style>
