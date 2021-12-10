import Vuex from 'vuex'
import auth from '@/store/auth'
import alert from '@/store/alert'
import timezone from '@/store/timezone'
import product from '@/store/product'
import cart from '@/store/cart'
import ticket from '@/store/ticket'
import subscription from '@/store/subscription'
import langganan from '@/store/langganan'

const createStore = () => {
  return new Vuex.Store({
    state: {
      prevUrl: '',
    },
    mutations: {
      setPrevUrl: (state, value) => {
        state.prevUrl = value
      },
    },
    actions: {
      setPrevUrl: ({ commit }, value) => {
        commit('setPrevUrl', value)
      },
    },
    getters: {
      prevUrl: state => state.prevUrl,
    },
    modules: {
      auth,
      alert,
      timezone,
      product,
      cart,
      ticket,
      subscription,
      langganan
    }
  })
}

export default createStore