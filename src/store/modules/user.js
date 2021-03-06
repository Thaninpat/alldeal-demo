import VueJwtDecode from 'vue-jwt-decode'
import { getCookie } from '../../helper/utils'

const user = {
  namespaced: true,
  state: {
    user: [],
  },
  mutations: {
    SET_USER(state, data) {
      state.user = data
    },
  },
  actions: {
    async getUser({ commit }) {
      let token = await getCookie('id_token')
      const errExcept = "Cannot read properties of null (reading 'split')"
      try {
        let decoded = await VueJwtDecode.decode(token)
        const data = decoded
        commit('SET_USER', data)
      } catch (error) {
        if (error.message === errExcept) return
        else console.log(error.message)
      }
    },
  },
  getters: {
    user(state) {
      return state.user
    },
  },
}
export default user
