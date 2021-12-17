import Api from '../http-common'
import { getCookie } from '../helper/utils'

const token = getCookie('id_token')
console.log('token :', token)
class userDataService {
  getOrder(params) {
    return Api(token).get('/paidorderitems', { params })
  }
  getCampaign(params) {
    return Api(token).get('/campaigns', { params })
  }
  getOrderSummary() {
    return Api(token).get('/ordersummary')
  }
  getPaidOrderItems(params) {
    return Api(token).get('/paidorderitems', { params })
  }
}

export default new userDataService()
