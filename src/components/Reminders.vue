<template>
  <li>{{ this.author }}: {{ this.title }} - {{ this.release }}</li>
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
    author: String
  }
}
</script>
