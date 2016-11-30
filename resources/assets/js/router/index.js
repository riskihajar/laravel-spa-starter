import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import {localStorageGetItem} from '../utils/local-storage'

import dashboard from '../modules/dashboard/routes'
import category from '../modules/category/routes'
import login from '../modules/login/routes'

Vue.use(Router)

const routes = [...login, ...category, ...dashboard]

const router = new Router({
    routes,
    linkActiveClass: 'active',
    mode: 'hash'
})

router.beforeEach((to, from, next) => {
    store.dispatch('resetMessages')

    let token = store.state.token
    const auth = to.meta.requiresAuth

    if(token === ''){
        const localStoredToken = localStorageGetItem('token')
        const localStoredUser = localStorageGetItem('user')

        if( localStoredToken !== undefined &&
            localStoredToken !== null &&
            localStoredUser !== undefined &&
            localStoredUser !== null
        ){
            token = localStoredToken.token
            store.dispatch('setToken', token)
            store.dispatch('setUser', localStoredUser.user)
        }
    }

    if(auth === undefined || !auth || token !== ''){
        next()
    }

    if(auth !== undefined && auth && token === ''){
        next({name: 'login.index'})
    }
})

export default router
