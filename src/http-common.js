import axios from 'axios'

export default axios.create({
  baseURL:
    'https://ccufsf0ym3.execute-api.ap-southeast-1.amazonaws.com/qa/supplier/v1',
  headers: {
    'Content-type': 'application/json',
    'x-total-count': 'x-total-count',
    Authorization: `Bearer ${localStorage.getItem('id_token')}`,
  },
})
