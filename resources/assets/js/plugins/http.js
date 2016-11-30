import axios from 'axios'
import store from '../store'
import router from '../router'

/* you can use config or window.apiURL from blade template */
// import {apiURL} from '../config'

const http = axios.create({
    baseURL: apiURL
})

export function setToken(token) {
    http.defaults.headers.common.Authorization = `Bearer: ${token}`
}

http.interceptors.response.use(
    response => response,
    (error) => {
        if(error.response.data.error === 'token_expired' || error.response.data.error === 'token_not_provided'){
            router.push({name: 'login.index'})

            store.dispatch('setToken', '')
            store.dispatch('setUser', {})

            error.response.data.messages.push('Session Timeout, Please Login')
        }else if(error.response.data.reason === 'token'){
            router.push({name: 'login.index'})
        }

        store.dispatch('setMessage', {type: 'error', message: error.response.data.messages})
        store.dispatch('setFetching', {fetching: false})
        return Promise.reject(error)
    }
)

export default function install(Vue) {
    Object.defineProperties(Vue.prototype, {
        $http: {
            get(){
                return http
            }
        }
    })
}
