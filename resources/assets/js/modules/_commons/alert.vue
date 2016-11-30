<template>
    <div>
        <el-alert v-if="hasSuccessMessage" :title="title" :description="message.success" type="success" show-icon></el-alert>
        <el-alert v-if="hasErrorMessage" :title="title" :description="errorDescription" type="error" show-icon></el-alert>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default{
    props: {
        title: {
            type: String,
            default: 'Alert'
        }
    },
    computed: {
        ...mapState(['messages']),
        hasSuccessMessage(){
            return this.messages.success !== ''
        },
        hasErrorMessage(){
            return this.messages.error.length > 0
        },
        errorDescription(){
            return this.messages.error.join('. ')
        }
    },
    methods: {
        ...mapActions(['setMessage']),
        dismiss(type){
            let obj
            if(type === 'error'){
                obj = { type, message: [] }
            }else{
                obj = { type, message: ''}
            }

            this.setMessage(obj)
        }
    }
}
</script>
