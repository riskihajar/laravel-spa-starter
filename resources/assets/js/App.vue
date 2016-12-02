<template>
    <div id="app" :class="{'login-wrapper': isLoginPage}">
        <navigation v-show="!isLoginPage"></navigation>
        <div class="container">
            <transition>
                <router-view></router-view>
            </transition>
        </div>
        <spinner></spinner>

        <footer>
            <a href="https://github.com/riskihajar/laravel-spa-starter"><icon i="github" type="mdi"></icon> github</a>
        </footer>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import navigation from './modules/_commons/navbar.vue'
import spinner from './modules/_commons/spinner.vue'
import icon from './modules/_commons/icon.vue'

export default{
    name: 'LaravelSPA',
    components: {navigation, spinner, icon},
    computed: {
        isLoginPage(){
            return this.$route.name === 'login.index'
        }
    },
    methods:{
        ...mapActions(['setUser', 'setFetching']),
        checkTokenIsValid(){
            if(this.isLoginPage) return;
            this.setFetching({fetching: true})
            this.$http.get('profile').then(response => {
                if(response.data.user !== undefined){
                    this.setUser(response.data.user)
                }
                this.setFetching({fetching: false})
            })
        }
    },
    mounted(){
        this.checkTokenIsValid();
    }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active{
    transition: opacity .5s ease;
}

.fade-enter, .fade-leave-active{
    opacity: 0;
}
</style>
