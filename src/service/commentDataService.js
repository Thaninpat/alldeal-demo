import http from '../http-common'

class commentDataService {
  getAll(params) {
    return http.get('/comments', { params })
  }

  // other CRUD methods
}

export default new commentDataService()
// /comments?_page=2&_limit=4
