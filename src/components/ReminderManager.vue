<template>
  <div class="container reminder">
    <header>
      <h1 class="header">Reminder Manager</h1>
      <div>There {{ this.countReminders === 1 ? 'is' : 'are' }} {{ this.countReminders }} reminder{{ this.countReminders === 1 ? '' : 's' }}</div>
    </header>
    <div>
      <ul>
        <remindermonth  v-for="(month, index) in dateGroups"
          :key="`month-${index}`"
          :month="month.title"
          :list="month.arr"
          />
      </ul>
    </div>
  </div>
</template>

<script>
import remindermonth from './ReminderMonth'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('reminder')

export default {
  name: 'ReminderManager',
  components: {
    remindermonth
  },
  async created () {
    this.refreshReminders()
  },
  computed: {
    ...mapState({
      reminderList: state => state.myReminders
    }),
    ...mapGetters([
      'countReminders',
      'dateGroups'
    ])
  },
  methods: {
    ...mapActions([
      'refreshReminders'
    ])
  }
}
</script>
