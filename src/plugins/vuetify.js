import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
    values: {
      mdiCashRefund: 'mdi-cash-refund',
      Close: 'mdi-close',
      EmailOpen: 'mdi-email-open-outline',
      Flashlight: 'mdi-flashlight',
      FlashlightOff: 'mdi-flashlight-off',
      Image: 'mdi-image-area',
      NotifyBell: 'mdi-bell-outline',
      NotifyBellClose: 'mdi-bell',
      Offline: 'mdi-web-cancel',
      Online: 'mdi-web',
      Qrcode: 'mdi-qrcode-scan',
      Sort: 'mdi-sort',
      Filter: 'mdi-filter-menu-outline',
      FilterClose: 'mdi-filter-minus',
    },
  },
})
