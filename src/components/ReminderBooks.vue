<template>
  <li>{{ this.author }}: {{ this.title }} - {{ this.release }}</li>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  name: 'reminderbooks',
  props: {
    book: Object,
    title: String,
    release: String,
    future: Boolean,
    author: String
  }
}
</script>
