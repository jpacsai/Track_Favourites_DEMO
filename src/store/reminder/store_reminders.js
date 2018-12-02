import api from '@/api'
import parseReminder from './helpers/parseReminder'
import addDate from './helpers/addDate'
import groupByDate from './helpers/groupByDate'

const reminderStore = {
  namespaced: true,
  state: {
    myReminders: []
  },
  getters: {
    countReminders: state => {
      return state.myReminders.length
    },
    dateGroups: state => {
      return groupByDate(state.myReminders)
    }
  },
  mutations: {
    SET_REMINDERS (state, arr) {
      state.myReminders = arr
    }
  },
  actions: {
    extractReminder ({dispatch}, [obj, type]) {
      const reminder = parseReminder(obj, type)
      dispatch('saveReminder', reminder)
    },
    async refreshReminders ({dispatch}) {
      console.log('refresh')
      const reminders = await api.getReminders()
      const withDate = addDate(reminders)
      dispatch('set_reminders', withDate)
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
