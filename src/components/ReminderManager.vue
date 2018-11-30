<template>
  <div class="container book">
    <header>
      <h1 class="header">Reminder Manager</h1>
    </header>
    <div>
      <button @click="myAction">My library</button>
    </div>
  </div>
</template>

<script>
// import { mapState, mapActions, mapMutations } from 'vuex'

import { createNamespacedHelpers } from 'vuex'

const { mapActions } = createNamespacedHelpers('reminders')

export default {
  name: 'ReminderManager',
  components: {},
  computed: {
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    ...mapActions([
      'myAction'
    ])
  }
}
</script>
