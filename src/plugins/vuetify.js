import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
    values: {
      mdiCart: 'mdi-cart-check',
      mdiCertificate: 'mdi-certificate-outline',
      mdiTicket: 'mdi-ticket-percent-outline',
      mdiCashCheck: 'mdi-cash-check',
      mdiCashRefund: 'mdi-cash-refund',
      Qrcode: 'mdi-qrcode-scan',
      Flashlight: 'mdi-flashlight',
      FlashlightOff: 'mdi-flashlight-off',
      Close: 'mdi-close',
      Image: 'mdi-image-area',
    },
  },
})
