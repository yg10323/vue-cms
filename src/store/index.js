import Vue from 'vue'
import Vuex from 'vuex'
import login from './login'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login
  }
})

export default store


export function initStore() {
  store.commit('loadLocalStorage')
}
