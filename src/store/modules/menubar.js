const menus = {
  // namespaced: true,
  state: {
    menus: [
      {
        name: 'Home',
        to: '/home',
      },
      {
        name: 'Order Summary',
        to: '/order-summary',
      },
      {
        name: 'Order Detail',
        to: '/order-detail',
      },
      {
        name: 'Coupon Redemption',
        to: '/coupon-redemption',
      },
      {
        name: 'Invoice Statement Tax',
        to: '/invoice-statement-tax',
      },
      {
        name: 'QRcode Scanner',
        to: '/qrcode-scanner',
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
