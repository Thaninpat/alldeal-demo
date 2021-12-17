import http from '../http-common'

class userDataService {
  getOrder(params) {
    return http.get('/paidorderitems', { params })
  }
  getCampaign(params) {
    return http.get('/campaigns', { params })
  }
  getOrderSummary() {
    return http.get('/ordersummary')
  }
  getPaidOrderItems(params) {
    return http.get('/paidorderitems', { params })
  }
}

export default new userDataService()
