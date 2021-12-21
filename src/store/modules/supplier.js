import { getSupplier } from '../../services/getData.service'
const supplier = {
  namespaced: true,
  state: {
    orders: [],
    campaignItems: [],
    coupons: [],
  },
  mutations: {
    SET_ORDERS(state, data) {
      state.orders = data
    },
    SET_CAMPAIGN(state, data) {
      state.campaignItems = data
    },
    SET_COUPON(state, data) {
      state.coupons = data
    },
  },
  actions: {
    async getOrders({ commit }, payload) {
      try {
        const res = await getSupplier(payload)
        commit('SET_ORDERS', res.data)
      } catch (error) {
        console.log(error.message)
      }
    },
    async getCampaignItems({ commit }, payload) {
      try {
        const res = await getSupplier(payload)
        commit('SET_CAMPAIGN', res.data)
      } catch (error) {
        console.log(error.message)
      }
    },
    async getCoupons({ commit }, payload) {
      try {
        const res = await getSupplier(payload)
        commit('SET_COUPON', res.data)
      } catch (error) {
        console.log(error.message)
      }
    },
  },
  getters: {
    orders(state) {
      return state.orders
    },
    campaignItems(state) {
      return state.campaignItems
    },
    coupons(state) {
      return state.coupons
    },
  },
}

export default supplier
