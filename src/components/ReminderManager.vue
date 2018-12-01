<template>
  <div class="container book">
    <header>
      <h1 class="header">Reminder Manager</h1>
    </header>
    <div>
      <reminders v-for="b in reminders_book"
          v-bind:key="b.id"
          v-bind:author="b.author"
          v-bind:title="b.title"
          v-bind:release="b.displayDateString"
          v-bind:future="b.future" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import reminders from './Reminders'

export default {
  name: 'ReminderManager',
  components: {
    reminders
  }, /*
  async created () {
    this.refreshBooks()
  }, */
  methods: {
    filterBooks (arr) {
      return arr.filter(b => b.future === true)
    }
  },
  computed: {
    ...mapState('book/library', {
      bookList: state => state.myBooks
    }),
    reminders_book () {
      return this.filterBooks(this.bookList)
    }
  }
}
</script>
