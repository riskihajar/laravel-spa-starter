import * as TYPES from './types'
import {localStorageSetItem} from '../utils/local-storage'
import {setToken as httpSetToken} from '../plugins/http'

export default{
    setFetching({commit}, obj){
        commit(TYPES.MAIN_SET_FETCHING, obj)
    },
    setMessage({commit}, obj){
        commit(TYPES.MAIN_SET_MESSAGE, obj)
    },
    resetMessages({commit}, obj){
        commit(TYPES.MAIN_SET_MESSAGE, {type: 'success', message: ''})
        commit(TYPES.MAIN_SET_MESSAGE, {type: 'error', message: ''})
        commit(TYPES.MAIN_SET_MESSAGE, {type: 'warning', message: ''})
    },
    setToken({commit}, token){
        localStorageSetItem('token', {token})
        httpSetToken(token)

        commit(TYPES.MAIN_SET_TOKEN, {token})
    },
    setUser({commit}, user){
        localStorageSetItem('user', {user})

        commit(TYPES.MAIN_SET_USER, {user})
    }
}
