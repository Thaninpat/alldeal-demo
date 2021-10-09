const menus = {
  // namespaced: true,
  state: {
    menus: [
      {
        name: 'Home',
        to: '/home',
        role: ['ROLE_ADMIN', 'ROLE_ACCOUNT', 'ROLE_SALE'],
      },
      {
        name: 'Order Summary',
        to: '/order-summary',
        role: ['ROLE_ADMIN', 'ROLE_AGENT', 'ROLE_SALE'],
      },
      {
        name: 'Order Detail',
        to: '/order-detail',
        role: ['ROLE_ADMIN', 'ROLE_AGENT', 'ROLE_SALE'],
      },
      {
        name: 'Coupon Redemption',
        to: '/coupon-redemption',
        role: ['ROLE_ADMIN', 'ROLE_AGENT', 'ROLE_SALE'],
      },
      {
        name: 'Invoice Statement Tax',
        to: '/invoice-statement-tax',
        role: ['ROLE_ADMIN', 'ROLE_ACCOUNT', 'ROLE_SALE'],
      },
    ],
  },

  getters: {
    menus(state) {
      return state.menus
    },
  },
}
export default menus
