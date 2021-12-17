import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import OrderDetail from '../pages/OrderDetail.vue'
import OrderSummary from '../pages/OrderSummary.vue'
import CouponRedemption from '../pages/CouponRedemption.vue'
import InvoiceStatementTax from '../pages/InvoiceStatementTax.vue'

import { getCookie } from '../helper/utils'

// import { Role } from '../helper/Roles'

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
      authorize: [],
    },
  },
  {
    path: '/order-summary',
    name: 'orderSummary',
    component: OrderSummary,
    meta: {
      authorize: [],
    },
  },
  {
    path: '/order-detail',
    name: 'orderDetail',
    component: OrderDetail,
    meta: {
      authorize: [],
    },
  },
  {
    path: '/coupon-redemption',
    name: 'couponRedemption',
    component: CouponRedemption,
    meta: {
      authorize: [],
    },
  },
  {
    path: '/invoice-statement-tax',
    name: 'invoiceStatementTax',
    component: InvoiceStatementTax,
    meta: {
      authorize: [],
    },
  },
  {
    path: '/redirect',
    name: 'redirect',
    component: () => import('../pages/Redirect.vue'),
  },
  { path: '*', redirect: '/' },
  {
    path: '/:catchAll(.*)',
    component: () => import('../components/NotFoundComponent.vue'),
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
  const token = getCookie('id_token')
  let url_string = window.location.href
  let url = new URL(url_string)
  let code = url.searchParams.get('code')
  if (authorize) {
    if (token || code) {
      return next()
      // return next({ path: '/login', query: { returnUrl: to.path } })
    } else return next({ path: '/redirect' })
    // else {
    //   let user = VueJwtDecode.decode(token)
    //   if (authorize.length && !authorize.includes(user.data.roles[0])) {
    //     if (user.data.roles[0] == 'ROLE_ACCOUNT') {
    //       return next({ path: '/' })
    //     }
    //     if (user.data.roles[0] == 'ROLE_AGENT') {
    //       return next({ path: '/order-summary' })
    //     }
    //   } else {
    //     next()
    //   }
    // }
  }
  next()
})

export default router
