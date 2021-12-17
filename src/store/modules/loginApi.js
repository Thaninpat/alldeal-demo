import axios from 'axios'
import { setCookie } from '../../helper/utils'
import qs from 'qs'

const loginApi = {
  namespaced: true,
  state: {
    loginApi: [],
  },
  mutations: {
    SET_LOGINAPI(state, data) {
      state.loginApi = data
    },
  },
  actions: {
    async getLoginApi({ commit }) {
      try {
        const data = qs.stringify({
          grant_type: 'authorization_code',
          code: this.code,
          client_id: process.env.VUE_APP_CLIENT_ID,
          redirect_uri: 'https://alldeal-demo.netlify.app/',
        })

        const basicBase64 = btoa(
          `${process.env.VUE_APP_CLIENT_ID}:${process.env.VUE_APP_CLIENT_SECRET}`
        )
        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${basicBase64}`,
          },
          data,
          url: process.env.VUE_APP_URL_OAUTH,
        }
        const response = await axios(options)
        if (response.status == 200) {
          console.log('response: ', response)
          commit('SET_LOGINAPI', response.data)
          setCookie(response.data)
          // console.log(getCookie('id_token'))
        }
        // this.$router.replace('/')
      } catch (error) {
        console.log(error.message)
      }
    },
  },
  getters: {
    loginApi(state) {
      return state.loginApi
    },
  },
}

export default loginApi

// const orders = {
//     supplier = []
// }
// const actions = {}
// const mutation = {}
// const getters = {}
