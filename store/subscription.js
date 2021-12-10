export default {
  namespaced: true,
  state: {
    subscription: [],
  },
  mutations: {
    set: (state, value) => {
      state.subscription = value
    },
  },
  actions: {
    set: ({ commit }, value) => {
      commit('set', value)
    },
  },
  getters: {
    subscription: state => state.subscription,
  }
}