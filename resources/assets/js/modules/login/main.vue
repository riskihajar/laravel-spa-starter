<template>
    <el-row type="flex" justify="center" align="middle" v-loading.body="loading">
        <el-col :lg="6" class="login-container">
            <el-card class="box-card">
                <header slot="header">
                    <icon i="apple" type="mdi"></icon> Login Laravel SPA Starter
                </header>
                <alert title="Login Error" class="login-space"></alert>
                <el-input v-model="credentials.email" size="large" class="login-space" placeholder="Email" :icon="iMdi('account')"></el-input>
                <el-input v-model="credentials.password" size="large" class="login-space" placeholder="Password" type="password" :icon="iMdi('lock')"></el-input>
                <el-button type="primary" class="login-button" size="large" @click="submit"><icon i="sign-in" type="mdi"></icon> Login</el-button>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import {mapActions} from 'vuex'
import icon from '../_commons/icon.vue'
import alert from '../_commons/alert.vue'

export default{
    components: { icon, alert },
    data(){
        return{
            credentials:{
                email: 'admin@laravel-spa.dev',
                password: '123456'
            }
        }
    },
    methods: {
        ...mapActions(['setToken', 'setUser', 'setMessage']),
        submit(){
            this.$http.post('login', this.credentials).then((response) => {
                this.handleResponse(response)
            })
        },
        handleResponse(response){
            const data = response.data
            this.setToken(data.token)
            this.setUser(data.user)
            this.setMessage({type: 'error', message: []})

            this.$router.push({name: 'dashboard.index'})
        },
        reset(){
            this.credentials = {
                email: '',
                password: ''
            }
        }
    }
}
</script>

<style lang="scss">
.login-wrapper{
    .login-container{
        @media (min-width: 1281px) {
            width: 16.66667%;
        }
    }

    .el-card{
        border: none;
    }

    .el-card__header{
        background: #20A0FF;
        color: #fff;
        text-align: center;
    }

    .login-space{
        margin-bottom: 20px;
    }

    .login-button{
        // width: 100%;
    }
}
</style>
