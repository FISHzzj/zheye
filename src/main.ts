import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'

async function hello () {
  const greeting = await Promise.resolve('hello')
  return greeting
}
hello().then(value => console.log(value))

axios.defaults.baseURL = 'http://localhost:7001/api/'
axios.interceptors.request.use((config) => {
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  return config
})
axios.interceptors.response.use((config) => {
  store.commit('setLoading', false)
  return config
}, e => {
  console.log(e.response)
  const error = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(error)
})
// axios.interceptors.request.use((config) => {
//   config.params = { ...config.params, icode: 'C6A6C4086133360B' }
//   return config
// })
// axios.get('/columns', { params: { key: 'hello' } }).then((resp) => {
//   console.log(resp.data)
// })

createApp(App).use(store).use(router).mount('#app')
