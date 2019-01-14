// import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8081/',
  json: true
})

export default {
  async execute (method, resource, data) {
    // inject the accessToken for each request
    // let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data /*,
      headers: {
        Authorization: `Bearer ${accessToken}`
      } */
    }).then(req => {
      return req.data
    })
  },
  /* BOOKS operations */
  getBooks () {
    console.log('get library')
    // const a = this.execute('get', '/books')
    return this.execute('get', '/books')
  },
  getBook (id) {
    return this.execute('get', `/books/${id}`)
  },
  createBook (data) {
    return this.execute('post', '/books', data)
  },
  updateBook (id, data) {
    return this.execute('put', `/books/${id}`, data)
  },
  deleteBook (id) {
    return this.execute('delete', `/books/${id}`)
  },
  /* REMINDERS operations */
  getReminders () {
    console.log('get reminders')
    return this.execute('get', '/reminders')
  },
  getReminder (id) {
    return this.execute('get', `/reminders/${id}`)
  },
  createReminder (data) {
    return this.execute('post', '/reminders', data)
  },
  updateReminder (id, data) {
    return this.execute('put', `/reminders/${id}`, data)
  },
  deleteReminder (id) {
    return this.execute('delete', `/reminders/${id}`)
  }
}
