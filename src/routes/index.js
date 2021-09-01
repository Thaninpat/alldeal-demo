import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import OrderSummary from '../pages/OrderSummary.vue'
import OrderDetail from '../pages/OrderDetail.vue'
import CouponRedemption from '../pages/CouponRedemption.vue'
import InvoiceStatementTax from '../pages/InvoiceStatementTax.vue'
import qrcodeScanner from '../pages/qrcodeScanner.vue'

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/order-summary',
    name: 'orderSummary',
    component: OrderSummary,
  },
  {
    path: '/order-detail',
    name: 'orderDetail',
    component: OrderDetail,
  },
  {
    path: '/coupon-redemption',
    name: 'couponRedemption',
    component: CouponRedemption,
  },
  {
    path: '/invoice-statement-tax',
    name: 'invoiceStatementTax',
    component: InvoiceStatementTax,
  },
  {
    path: '/qrcode-scanner',
    name: 'QRcode Scanner',
    component: qrcodeScanner,
  },
  // {
  //   path: '/qrcode-scan',
  //   name: 'qrcodeScan',
  //   component: QRCodeScan,
  // },
  // {
  //   path: '/qrcode-scan/',
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../components/QRCodeScan.vue'),
  // },
]

const router = new VueRouter({
  routes,
})
Vue.use(VueRouter)

export default router
