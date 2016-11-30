import * as TYPES from '../../store/types'

const state = {
    data: {}
}

const mutations = {
    [TYPES.CATEGORY_SET_DATA](state, obj){
        state.data = obj.category
    }
}

const actions = {
    categorySetData({commit}, obj){
        commit(TYPES.CATEGORY_SET_DATA, obj)
    }
}

export default{
    state, mutations, actions
}
