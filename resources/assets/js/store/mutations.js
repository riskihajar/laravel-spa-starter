import * as TYPES from './types'

export default{
    [TYPES.MAIN_SET_TOKEN](state, obj){
        state.token = obj.token
    },
    [TYPES.MAIN_SET_FETCHING](state, obj){
        state.fetching = obj.fetching
    },
    [TYPES.MAIN_SET_USER](state, obj){
        state.user = obj.user
    },
    [TYPES.MAIN_SET_MESSAGE](state, obj){
        state.messages[obj.type] = obj.message
    },
}
