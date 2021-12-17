import http from '../http-common'
import { getCookie } from '../helper/utils'

const token = getCookie('id_token')
console.log('token :', token)
class userDataService {
  getOrder(params) {
    return http.get('/paidorderitems', {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params,
    })
  }
  getCampaign(params) {
    return http.get('/campaigns', {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params,
    })
  }
  getOrderSummary() {
    return http.get('/ordersummary')
  }
  getPaidOrderItems(params) {
    return http.get('/paidorderitems', {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params,
    })
  }
}

export default new userDataService()
