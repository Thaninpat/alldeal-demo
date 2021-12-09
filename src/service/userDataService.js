import http from '../http-common'

class userDataService {
  getOrder(params) {
    return http.get('/paidorderitems', { params })
  }
  getCampaign() {
    return http.get('/campaigns')
  }
  getOrderSummary() {
    return http.get('/ordersummary')
  }
}

export default new userDataService()
