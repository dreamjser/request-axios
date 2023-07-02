import {getGlobalAxios, getAxios} from '../src/index.js'

const axiosInstance = getGlobalAxios({
  timeout: 30000
})

const request = (opts) => {
  return getAxios(opts, axiosInstance)
}

request({
  url: 'http://localhost:4004/api/login',

}).then((r) => {
  console.log(r, '999')
}).catch((error) => {
  console.log(error)
})
