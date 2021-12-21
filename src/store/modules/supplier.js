// import axios from 'axios'
// import { getCookie, removeCookie } from '../../helper/utils'
// import router from '../../routes'
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
        // console.log(`API ${payload.path} res: `, res.data)
        commit('SET_CAMPAIGN', res.data)
      } catch (error) {
        console.log(error.message)
      }
    },
    async getCoupons({ commit }, payload) {
      try {
        const res = await getSupplier(payload)
        console.log(`API ${payload.path} res: `, res.data)
        commit('SET_COUPON', res.data)
      } catch (error) {
        console.log(error.message)
      }
    },
    // getSupplier(payload) {
    //   console.log({ payload })
    //   try {
    //     let path = payload.path
    //     let params = payload.params
    //     const options = {
    //       headers: {
    //         'content-type': 'application/json',
    //         Authorization: `Bearer ${getCookie('id_token')}`,
    //       },
    //       params,
    //     }
    //     const res = axios.get(`${process.env.VUE_APP_API}${path}`, options)
    //     console.log(`API ${path} res: `, res)
    //     if (res.data.code == 'CBE005') {
    //       this.authorizationCode()
    //     } else return res
    //   } catch (error) {
    //     console.log(error.message)
    //   }
    // },
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
