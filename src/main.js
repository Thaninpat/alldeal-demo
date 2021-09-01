import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import router from './routes'
import store from './store'
import BaseLayout from './components/base/BaseLayout'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.component('base-layout', BaseLayout)

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
