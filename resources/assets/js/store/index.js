import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'

import category from '../modules/category/state'

Vue.use(Vuex)

export default new Vuex.Store({
    state, mutations, actions,
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        category
    }
})
