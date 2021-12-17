import Vue from 'vue'
import Vuex from 'vuex'
import menus from './modules/menubar'
import orders from './modules/orders'
import user from './modules/user'
import supplier from './modules/supplier'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: { menus, orders, user, supplier },
})
export default store
