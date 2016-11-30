<template>
    <el-row class="navbar-header">
        <el-col :span="5">
            <div class="brand-title">
                <icon i="apple" type="mdi"></icon>
                Laravel SPA Starter
            </div>
        </el-col>
        <el-col :span="17">
            <el-menu class="sm-menu" theme="dark" mode="horizontal" :default-active="active" :router="true">
                <el-menu-item index="dashboard.index" :route="{name: 'dashboard.index'}"><icon i="home" type="mdi"></icon> Dashboard</el-menu-item>
                <el-menu-item index="category.index" :route="{name: 'category.index', query: {page: 1}}"><icon i="layers" type="mdi"></icon> Category</el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="2">
            <el-menu class="sm-menu sm-menu-right" theme="dark" mode="horizontal">
                <el-submenu index="1">
                    <template slot="title"><icon i="face" type="mdi"></icon> {{ user.name }}</template>
                    <el-menu-item index="1-1"><icon i="account-circle" type="mdi"></icon> Profile</el-menu-item>
                    <el-menu-item index="1-2"><icon i="setting"></icon>Setting</el-menu-item>
                    <el-menu-item index="1-3"><a @click.prevent="logout"><icon i="sign-in" type="mdi"></icon> Logout</a></el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import icon from './icon.vue'

export default{
    components: {icon},
    computed: {
        ...mapState(['user']),
        active(){
            return this.$router.history.current.name
        }
    },
    methods: {
        ...mapActions(['setToken', 'setUser']),
        logout(){
            this.setToken('')
            this.setUser({})
            this.$router.push({name: 'login.index'})
        }
    }
}
</script>

<style scoped>
.username{
    padding: 6px 20px;
    border-radius: 20px;
    background-color: #ddd;
    display: inline-block;
}
</style>
