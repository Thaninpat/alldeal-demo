import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import router from './routes'
import store from './store'
// import axios from 'axios'
import BaseLayout from './components/base/BaseLayout'
import VueQrcodeReader from 'vue-qrcode-reader'

Vue.config.productionTip = false
Vue.component('base-layout', BaseLayout)
Vue.use(VueQrcodeReader)

// Vue.use(axios)
new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
