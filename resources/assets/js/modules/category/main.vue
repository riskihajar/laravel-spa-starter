<template>
    <el-row class="container">
        <el-col>
            <el-row>
                <el-col :span="12">
                    <h2>Category</h2>
                </el-col>
                <el-col :span="12" class="form-toggle">
                    <el-button @click="create" type="primary" v-show="!isFormVisible"><icon i="plus"></icon></el-button>
                    <el-button @click="hide" type="primary" v-show="isFormVisible"><icon i="minus"></icon></el-button>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="8">
                    <transition name="fade">
                        <router-view></router-view>
                    </transition>
                </el-col>
            </el-row>
            <alert class="mb20"></alert>
            <el-table :data="category.data" striped>
                <el-table-column prop="id" label="ID" width="50" align="center"></el-table-column>
                <el-table-column prop="name" label="Category Name"></el-table-column>
                <el-table-column
                    inline-template
                    :context="_self"
                    fixed="right"
                    label="Operations"
                    width="120" align="center">
                    <span>
                        <el-button @click="edit(row.id)" type="text" size="small"><icon i="edit"></icon></el-button>
                        <el-button @click="askRemove(row.id)" type="text" size="small"><icon i="delete"></icon></el-button>
                    </span>
                </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" :total="category.total" :page-size="category.per_page" :current-page="category.current_page" @current-change="changePage"></el-pagination>
        </el-col>
    </el-row>
</template>

<script>
import Vue from 'vue'
import {mapActions, mapState} from 'vuex'
import icon from '../_commons/icon.vue'
import alert from '../_commons/alert.vue'

export default{
    name: 'Category',
    components: {icon, alert},
    methods: {
        edit(id){
            this.$router.push({
                name: 'category.edit',
                params: {id},
                query: {page: this.currentPage}
            })
        },
        changePage(page){
            this.navigate({page: page})
        },
        create(){
            this.$router.push({name: 'category.new', query: {page: this.currentPage}})
        },
        hide(){
            this.$router.push({name: 'category.index', query: {page: this.currentPage}})
        },
        ...mapActions(['categorySetData', 'setFetching']),
        fetch(){
            this.setFetching({fetching: true})
            this.$http.get(`category?page=${this.currentPage}`).then(response => {
                this.categorySetData({ category: response.data.category })
                this.setFetching({fetching: false})
            })
        },
        navigate(obj){
            this.$router.push({name: 'category.index', query: {page: obj.page}})
            Vue.nextTick( () => this.fetch() )
        },
        askRemove(id){
            const sure = confirm('Are you sure delete this category?')

            if( ! sure) return;

            this.remove(id)
        },
        remove(id){
            this.$http.delete(`category/${id}`).then( () => {
                this.fetch()

                if(this.isFormVisible) {
                    this.$router.push({ name: 'category.index', query: {page: this.currentPage} })
                }
            }).catch( (error) => {
                window.alert(error.response.data.message[0])
            })
        }
    },
    computed: {
        ...mapState({
            fetching: state => state.fetching,
            category: state => state.category.data
        }),
        currentPage(){
            return parseInt(this.$route.query.page, 10)
        },
        isFormVisible(){
            return this.$route.name === 'category.new' || this.$route.name === 'category.edit'
        }
    },
    beforeRouteLeave(to, from, next){
        this.$bus.$off('navigate')
        this.$bus.$off('category.created')
        this.$bus.$off('category.updated')

        jQuery('body').off('keyup')

        next()
    },
    mounted(){
        this.$bus.$on('navigate', obj => this.navigate(obj))
        this.$bus.$on('category.created', () => this.fetch())
        this.$bus.$on('category.updated', () => this.fetch())

        this.fetch()
    }
}
</script>

<style scoped>
    .form-toggle{
        text-align: right;
    }

    .fade-enter-active, .fade-leave-active{
        transition: opacity .3s ease;
    }

    .fade-enter, .fade-leave-active{
        opacity: 0;
    }

    .container{
        padding: 20px;
    }

    .el-pagination{
        text-align: center;
        margin-top: 20px;
    }

    .mb20{
        margin-bottom: 20px;
    }
</style>
