import axios from 'axios'

export default axios.create({
  baseURL: 'https://alldeal-supplier-api.herokuapp.com/seller/v1',
  headers: {
    'Content-type': 'application/json',
    'x-total-count': 'x-total-count',
  },
})
