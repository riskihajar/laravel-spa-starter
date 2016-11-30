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
        if(['token_expired', 'token_not_provided', 'token_invalid'].indexOf(error.response.data.error) !== -1){
            router.push({name: 'login.index'})
            store.dispatch('setMessage', {type: 'error', message: ['Session timeout, Please Login']})
        }

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
