<template>
    <el-form label-width="120px">
        <el-form-item label="Category Name">
            <el-input v-model="category.name"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit"><icon i="floppy" type="mdi"></icon> Save</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import {mapActions}  from 'vuex'
import icon from '../_commons/icon.vue'

export default{
    name: 'FormCategory',
    components: {icon},
    data(){
        return {
            category: {
                id: 0,
                name: ''
            }
        }
    },
    mounted(){
        this.fetch()
    },
    watch: {
        $route: 'fetch'
    },
    computed: {
        isEditing(){
            return this.category.id > 0
        },
        currentPage(){
            return parseInt(this.$route.query.page, 10)
        }
    },
    methods: {
        ...mapActions(['setFetching', 'setMessage']),
        fetch(){
            const id = this.$route.params.id

            if(id !== undefined){
                this.setFetching({fetching: true})
                this.$http.get(`category/${id}`).then((response) => {
                    const {id: _id, name} = response.data.category

                    this.category.id = _id
                    this.category.name = name
                    this.setFetching({fetching: false})
                })
            }
        },
        submit(){
            this.setFetching({fetching: true})
            if(this.isEditing){
                this.update()
            }else{
                this.save()
            }
        },
        save(){
            this.$http.post(`category`, {name: this.category.name}).then(() => {
                this.$bus.$emit('category.created')
                this.setFetching({fetching: false})
                this.setMessage({type: 'success', message: 'Category created'})

                this.reset()
            })
        },
        update(){
            this.$http.put(`category/${this.category.id}`, this.category).then(() => {
                this.$bus.$emit('category.updated')
                this.setFetching({fetching: false})
                this.setMessage({type: 'success', message: 'Category updated'})

                this.reset()
            })
        },
        reset(){
            this.category.id = 0
            this.category.name = ''

            this.$router.push({name: 'category.index', query: {page: this.currentPage}})
        }
    }
}
</script>
