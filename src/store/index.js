import Vue from 'vue'
import Vuex from 'vuex'
import menus from './modules/menubar'
import orders from './modules/orders'
import user from './modules/user'
import loginApi from './modules/loginApi'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: { menus, orders, user, loginApi },
})
export default store
