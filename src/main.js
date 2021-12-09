import Vue from 'vue'
import axios from 'axios'

import App from './App.vue'
import vuetify from './plugins/vuetify'

import router from './routes'
import store from './store'
import BaseLayout from './components/base/BaseLayout'
import './registerServiceWorker'
import './vee-validate'

import { initializeApp } from 'firebase/app'
import settings from './settings'
import './controller'

Vue.config.productionTip = false

initializeApp(settings.firebaseConfig)

Vue.component('base-layout', BaseLayout)
const base = axios.create({
  baseURL: 'https://alldeal-login.herokuapp.com/api/v1', // replace on production env
  // baseURL: 'http://localhost:3000/api/v1',
})
Vue.prototype.$http = base

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
