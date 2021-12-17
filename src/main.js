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
import VueIframe from 'vue-iframes'
import { getLoginApi } from './helper/utils'

Vue.config.productionTip = false

initializeApp(settings.firebaseConfig)

Vue.component('base-layout', BaseLayout)
const base = axios.create({
  baseURL: 'https://alldeal-login.herokuapp.com/api/v1', // replace on production env
})
Vue.prototype.$http = base
Vue.use(VueIframe)
let url_string = window.location.href
let url = new URL(url_string)
let code = url.searchParams.get('code')
if (code) {
  Vue.use(getLoginApi)
}

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
