export default {
  namespaced: true,
  state: {
    utc: "",
    region: "",
  },
  mutations: {
    set: (state, payload) => {
      state.utc = payload.utc
      state.region = payload.region
    },
  },
  actions: {
    set: ({ commit }, payload) => {
      commit('set', payload)
    },
  },
  getters: {
    utc: state => state.utc,
    region: state => state.region,
  }
}