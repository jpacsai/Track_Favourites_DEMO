<template>
  <div class="container reminder">
    <header>
      <h1 class="header">Reminder Manager</h1>
      <div>There {{ this.countReminders === 1 ? 'is' : 'are' }} {{ this.countReminders }} reminder{{ this.countReminders === 1 ? '' : 's' }}</div>
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
          v-bind:hidden="r.hidden"
          v-bind:num="index" />
    </div>
  </div>
</template>

<script>
import reminders from './Reminders'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('reminder')

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
    }),
    ...mapGetters([
      'countReminders'
    ])
  },
  methods: {
    ...mapActions([
      'refreshReminders'
    ])
  }
}
</script>
