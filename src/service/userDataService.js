import http from '../http-common'

class userDataService {
  getAll(params) {
    return http.get('/users', { params })
  }

  // other CRUD methods
}

export default new userDataService()
