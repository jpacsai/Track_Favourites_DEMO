const reminderStore = {
  namespaced: true,
  state: {
    books: []
  },
  mutations: {},
  actions: {
    myAction: ({ commit, rootState }) => {
      console.log(rootState.book.library.myBooks)
    }
  }
}

export default reminderStore
