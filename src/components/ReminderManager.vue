<template>
  <div class="container book">
    <header>
      <h1 class="header">Reminder Manager</h1>
    </header>
    <div>
      <reminders v-for="(r, index) in reminderList"
          v-bind:key="r.id"
          v-bind:author="r.author"
          v-bind:title="r.title"
          v-bind:image="r.imgUrl"
          v-bind:sourceUrl="r.sourceUrl"
          v-bind:release="r.displayDateString"
          v-bind:date="r.dateObj"
          v-bind:type="r.type"
          v-bind:num="index" />
    </div>
  </div>
</template>

<script>
import reminders from './Reminders'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('reminder')

export default {
  name: 'ReminderManager',
  components: {
    reminders
  },
  async created () {
    this.refreshReminders()
  },
  computed: {
    ...mapState({
      reminderList: state => state.myReminders
    })
  },
  methods: {
    ...mapActions([
      'refreshReminders'
    ])
  }
}
</script>
