import axios from 'axios'

const defaultRequestOpts = {
  headers: {'Content-Type': 'application/json'}
}

export const authenticate = (endpoint, body) => {
  return axios.post(endpoint, body, defaultRequestOpts)
    .then(res => {
      return res.data
    })
  .catch(error => {
    return error
  })
}
