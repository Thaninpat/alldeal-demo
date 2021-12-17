import axios from 'axios'
import { getCookie } from '../../helper/utils'

const supplier = {
  namespaced: true,
  state: {
    supplier: [],
  },
  mutations: {
    SET_SUPPLIER(state, data) {
      state.supplier = data
    },
  },
  actions: {
    async getSupplier({ commit }, payload, params) {
      try {
        const res = await axios.get(`${process.env.VUE_APP_API}/${payload}`, {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${getCookie('id_token')}`,
          },
          params,
        })
        console.log({ payload })
        console.log({ params })
        console.log('API res: ', res)
        commit('SET_SUPPLIER', res.data)
      } catch (error) {
        console.log(error.message)
      }
    },
  },
  getters: {
    supplier(state) {
      return state.supplier
    },
  },
}

export default supplier

// const orders = {
//     supplier = []
// }
// const actions = {}
// const mutation = {}
// const getters = {}
