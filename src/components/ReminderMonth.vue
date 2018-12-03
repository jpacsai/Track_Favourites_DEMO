<template>
  <li>
    <h2>{{ this.month}}</h2>
    <reminders v-for="r in list"
          v-bind:key="r.id"
          v-bind:author="r.author"
          v-bind:title="r.title"
          v-bind:image="r.imgUrl"
          v-bind:sourceUrl="r.sourceUrl"
          v-bind:release="r.displayDateString"
          v-bind:date="r.dateObj"
          v-bind:type="r.type"
          v-bind:hidden="r.hidden" />
  </li>
</template>

<script>
import reminders from './Reminders'
// import { mapState } from 'vuex'

export default {
  name: 'remindermonth',
  components: {
    reminders
  },
  props: {
    month: String,
    list: Array
  }
}
</script>
