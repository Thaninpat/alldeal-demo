import axios from 'axios'
import { getCookie, removeCookie } from '../helper/utils'
import router from '../routes/index'

export const getSupplier = async (payload) => {
  if (payload) {
    try {
      let path = payload.path
      let params = payload.params
      let method = payload.method
      let data = payload.data
      const options = {
        method: method,
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${getCookie('id_token')}`,
        },
        params: params,
        data: data,
        url: `${process.env.VUE_APP_API}${path}`,
      }
      const res = await axios(options)
      if (res.data.code == 'CBE005') {
        authorizationCode()
      }
      return res
    } catch (error) {
      console.log(error.message)
    }
  }
}
const authorizationCode = () => {
  removeCookie('id_token')
  router.push('/redirect')
}
