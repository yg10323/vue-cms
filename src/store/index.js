import Vue from 'vue'
import Vuex from 'vuex'
import login from './login'
import global from './global'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    global
  }
})

export default store


export function initStore() {
  store.commit('loadLocalStorage')
}
