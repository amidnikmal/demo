import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    event: null
  },
  getters: {
  },
  mutations: {
    setEvent(state, payload) {
      state.event = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
