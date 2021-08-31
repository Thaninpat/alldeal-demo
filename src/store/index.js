import Vue from 'vue'
import Vuex from 'vuex'
import menus from './modules/menubar'
import orders from './modules/orders'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: { menus, orders },
})
export default store
