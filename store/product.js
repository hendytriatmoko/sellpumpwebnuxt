export default {
  namespaced: true,
  state: {
    sellerid: '',
    productid: '',
    unitid: '',
  },
  mutations: {
    setSeller: (state, payload) => {
      state.sellerid = payload
    },
    setProduct: (state, payload) => {
      state.productid = payload
    },
    setUnit: (state, payload) => {
      state.unitid = payload
    },
  },
  actions: {
    setSeller: ({ commit }, payload) => {
      commit('setSeller', payload)
    },
    setProduct: ({ commit }, payload) => {
      commit('setProduct', payload)
    },
    setUnit: ({ commit }, payload) => {
      commit('setUnit', payload)
    },
  },
  getters: {
    sellerid: state => state.sellerid,
    productid: state => state.productid,
    unitid: state => state.unitid,
  }
}