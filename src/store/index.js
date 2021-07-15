import Vue from 'vue'
import Vuex from 'vuex'
import menus from './modules/menubar'
import covid from './modules/covid-19'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: { menus, covid },
})
export default store
