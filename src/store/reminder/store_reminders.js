import api from '@/api'

const reminderStore = {
  namespaced: true,
  state: {
    myReminders: []
  },
  mutations: {
    SET_REMINDERS (state, arr) {
      state.myReminders = arr
    }
  },
  actions: {
    async refreshReminders ({dispatch}) {
      console.log('refresh')
      const reminders = await api.getReminders()
      dispatch('set_reminders', reminders)
    },
    set_reminders ({commit}, arr) {
      console.log(arr)
      commit('SET_REMINDERS', arr)
    },
    async saveReminder ({dispatch}, reminder) {
      await api.createReminder(reminder)
      await dispatch('refreshReminders')
    },
    async deleteReminder ({dispatch}, id) {
      await api.deleteReminder(id)
      await dispatch('refreshReminders')
    },
    async updateReminder ({dispatch}, [id, obj]) {
      await api.updateReminder(id, obj)
      await dispatch('refreshReminders')
    }
  }
}

export default reminderStore
