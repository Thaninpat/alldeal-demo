import axios from 'axios'

const orders = {
  namespaced: true,
  state: {
    orders: [],
  },
  mutations: {
    SET_ORDERS(state, data) {
      state.orders = data
    },
  },
  actions: {
    async getOrders({ commit }) {
      try {
        const { data } = await axios.get('/data/order.json/')
        commit('SET_ORDERS', data)
      } catch (error) {
        console.log(error)
      }
    },
  },
  getters: {
    orders(state) {
      return state.orders
    },
  },
}
export default orders
