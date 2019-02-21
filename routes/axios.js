const axios = require('axios')
const qs = require('qs')
const fetch = (url, params, method = 'post') => {
  return new Promise((resolve, reject) => {
    let config = {
      url: url,
      method: method,
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'CGS',
        'Content-Length':147

      }
    }
    if (method.match(/get|delete|head/)) {
      config.params = params
    } else {
      config.data = params//qs.stringify(params)
    }
    axios(config).then(res => resolve(res.data), err => {
      if (err.response) {
        resolve(err.response.data)
      } else {
        resolve({errors: err})
      }
    })
  })
}

module.exports =  ((array) => {
  return array.reduce((a, b) => {
    a[b] = (url, params) => fetch(url, params, b)
    return a
  }, {})
})(['get', 'post', 'delete', 'patch', 'put'])
