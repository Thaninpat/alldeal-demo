import Vue from 'vue'
import VueRouter from 'vue-router'
import VueJwtDecode from 'vue-jwt-decode'

import Home from '../pages/Home.vue'
import OrderDetail from '../pages/OrderDetail.vue'
import OrderSummary from '../pages/OrderSummary.vue'
import CouponRedemption from '../pages/CouponRedemption.vue'
import InvoiceStatementTax from '../pages/InvoiceStatementTax.vue'
// import Login from '../pages/Login.vue'
import NotFoundComponent from '../components/NotFoundComponent.vue'

import { Role } from '../helper/Roles'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      authorize: [Role.Admin, Role.Account, Role.Sale],
    },
  },
  {
    path: '/order-summary',
    name: 'orderSummary',
    component: OrderSummary,
    meta: {
      authorize: [Role.Admin, Role.Agent, Role.Sale],
    },
  },
  {
    path: '/order-detail',
    name: 'orderDetail',
    component: OrderDetail,
    meta: {
      authorize: [Role.Admin, Role.Agent, Role.Sale],
    },
  },
  {
    path: '/coupon-redemption',
    name: 'couponRedemption',
    component: CouponRedemption,
    meta: {
      authorize: [Role.Admin, Role.Agent, Role.Sale],
    },
  },
  {
    path: '/invoice-statement-tax',
    name: 'invoiceStatementTax',
    component: InvoiceStatementTax,
    meta: {
      authorize: [Role.Admin, Role.Account, Role.Sale],
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue'),
  },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    component: () => import('../pages/ForgetPassword.vue'),
  },
  {
    path: '/reset-password',
    name: 'resetPassword',
    component: () => import('../pages/ResetPassword.vue'),
  },
  { path: '*', redirect: '/' },
  {
    path: '/:catchAll(.*)',
    component: NotFoundComponent,
    name: 'NotFound',
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  if (to.name === from.name) {
    return next()
  }
  next()
  const { authorize } = to.meta
  const token = localStorage.getItem('user')
  if (authorize) {
    if (!token) {
      // return next({ path: '/login' })
      return next({ path: '/login', query: { returnUrl: to.path } })
    } else {
      let user = VueJwtDecode.decode(token)
      if (authorize.length && !authorize.includes(user.data.roles[0])) {
        if (user.data.roles[0] == 'ROLE_ACCOUNT') {
          return next({ path: '/' })
        }
        if (user.data.roles[0] == 'ROLE_AGENT') {
          return next({ path: '/order-summary' })
        }
      } else {
        next()
      }
    }
  }
  next()
})

export default router
