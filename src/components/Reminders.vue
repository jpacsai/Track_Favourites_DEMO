<template>
  <li class="reminder_li">
    <p class="order-num">{{ this.num }}</p>
    <div class="img-container">
        <a :href='sourceUrl' target='_blank'><img :src="image"/></a>
    </div>
    <div class="info">
      <p class="title">{{ this.title }}
      <p v-if="type === 'book'" class="author">by {{ this.author }}</p>
    </p>
    </div>
    <p>{{ this.release }}</p>
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
    num: Number,
    type: String,
    date: Object
  }
}
</script>
