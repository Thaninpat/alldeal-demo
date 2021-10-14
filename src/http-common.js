import axios from 'axios'

export default axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  //   baseURL: 'data',
  headers: {
    'Content-type': 'application/json',
    'x-total-count': 'x-total-count',
  },
})
