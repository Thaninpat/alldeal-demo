import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import OrderDetail from '../pages/OrderDetail.vue'
import OrderSummary from '../pages/OrderSummary.vue'
import CouponRedemption from '../pages/CouponRedemption.vue'
import InvoiceStatementTax from '../pages/InvoiceStatementTax.vue'
import ForgetPassword from '../components/ForgetPassword.vue'

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
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    component: ForgetPassword,
  },
]

const router = new VueRouter({
  routes,
})
Vue.use(VueRouter)

export default router
