import Vue from 'vue'
import Vuex from 'vuex'
import menus from './modules/menubar'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: { menus },
})
export default store
