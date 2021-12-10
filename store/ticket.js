export default {
  namespaced: true,
  state: {
    ticket: [],
  },
  mutations: {
    set: (state, value) => {
      state.ticket = value
    },
  },
  actions: {
    set: ({ commit }, value) => {
      commit('set', value)
    },
  },
  getters: {
    ticket: state => state.ticket,
  }
}