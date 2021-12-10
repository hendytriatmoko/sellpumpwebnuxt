export default {
  namespaced: true,
  state: {
    langganan: [],
  },
  mutations: {
    set: (state, value) => {
      state.langganan = value
    },
  },
  actions: {
    set: ({ commit }, value) => {
      commit('set', value)
    },
  },
  getters: {
    langganan: state => state.langganan,
  }
}