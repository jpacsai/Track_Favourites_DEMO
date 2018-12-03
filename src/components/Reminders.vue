<template>
  <li class="reminder_li" v-if="this.hidden === false">
    <p class="order-num">{{ this.release }}</p>
    <div class="img-container">
        <a :href='sourceUrl' target='_blank'><img :src="image"/></a>
    </div>
    <div class="info">
      <p class="title">{{ this.title }}</p>
      <p v-if="type === 'book'" class="author">by {{ this.author }}</p>
    </div>
    <p></p>
    <p></p>
  </li>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  name: 'reminders',
  props: {
    book: Object,
    title: String,
    release: String,
    future: Boolean,
    author: String,
    image: String,
    sourceUrl: String,
    type: String,
    date: Date,
    hidden: Boolean
  }
}
</script>
