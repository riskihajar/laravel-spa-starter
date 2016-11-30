<template>
    <div>
        <div class="row" v-if="hasData">
            <div class="col-md-6">
                <p class="rangeInformation">Showing {{ currentRange }} of {{ pager.total }}</p>
            </div>
            <div class="col-md-6 text-right">
                <nav aria-label="Page Navigation">
                    <ul class="pagination">
                        <li :class="{disabled: isFirst}">
                            <a href="#" aria-label="Previous" @click.prevent="navigatePrevious()">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li v-for="page in pages" :class="{active: currentPage === page}">
                            <a href="#" v-if="page !== '...'" @click.prevent="navigate(page)">{{ page }}</a>
                            <span v-if="page === '...'">{{ page }}</span>
                        </li>
                        <li :class="{disabled: isLast}">
                            <a href="#" aria-label="Next" @click.prevent="navigateNext()">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props: {
        pager: Object,
        currentPage: {
            type: Number,
            default: 1
        },
        maxItems: {
            type: Number,
            default: 10
        }
    },
    mounted(){
        this.enableKeyboardNavigation()
    },
    computed: {
        hasData(){
            return this.pager.total !== undefined
        },
        pages(){
            return this.generatePagesArray(
                this.currentPage, this.pager.total, this.pager.per_page, parseInt(this.maxItems, 10)
            )
        },
        isLast(){
            return this.currentPage === this.pager.last_page
        },
        isFirst(){
            return this.currentPage === 1
        },
        isOutOfRange(){
            if(isNaN(this.currentPage) || this.currentPage === null){
                return true
            }

            return this.currentPage > this.pager.last_page || this.currentPage < 1
        },
        currentRange(){
            let firstItem = (this.pager.per_page * (this.currentPage - 1)) + 1
            let lastItem = (this.pager.per_page * this.currentPage)

            if(this.pager.total < lastItem){
                lastItem = this.pager.total
            }

            if(this.totalPages === 1){
                firstItem = 1
            }

            if(this.totalPage === 0){
                firstItem = 0
            }

            return `${firstItem} s/d ${lastItem}`
        }
    },
    methods: {
        enableKeyboardNavigation(){
            jQuery('body').on('keyup', ({keyCode}) => {
                if(keyCode === 37){
                    this.navigatePrevious()
                }

                if(keyCode === 39){
                    this.navigateNext()
                }
            })
        },
        navigate(page){
            if(page !== this.currentPage){
                this.dispatch(page)
            }
        },
        navigatePrevious(){
            if(!this.isFirst){
                this.dispatch(this.currentPage - 1)
            }
        },
        navigateNext(){
            if(!this.isLast){
                this.dispatch(this.currentPage + 1)
            }
        },
        dispatch(page){
            this.$bus.$emit('navigate', {page})
        },
        generatePagesArray(currentPage, collectionLength, rowsPerPage, maxItems){
            if(this.isOutOfRange){
                this.navigate(1)
                return false;
            }

            const pages = []
            const totalPages = Math.ceil(collectionLength / rowsPerPage)
            const halfWay = Math.ceil(maxItems/2)
            const ellipsesNeeded = maxItems < totalPages

            let position

            if(currentPage <= halfWay){
                position = 'start'
            } else if(totalPages - halfWay < currentPage){
                position = 'end'
            }else{
                position = 'middle'
            }

            let i = 1

            while(i <= totalPages && i<= maxItems){
                const pageNumber = this.calculatePageNumber(i, currentPage, maxItems, totalPages)
                const openingElipsesNeeded = (i === 2 && (position === 'middle') || position == 'end')
                const closingElipsesNeeded = (i === maxItems -1 && (position === 'middle') || position == 'start')

                if(ellipsesNeeded && (openingElipsesNeeded || closingElipsesNeeded)){
                    pages.push('...')
                }else{
                    pages.push(pageNumber)
                }

                i += 1
            }

            return pages
        },
        calculatePageNumber(i, currentPage, maxItems, totalPages){
            const halfWay = Math.ceil(maxItems/2)

            if(i === maxItems){
                return totalPages
            }else if(i === 1){
                return i
            }else if(maxItems < totalPages){
                if(totalPages - halfWay < currentPage){
                    return (totalPages - maxItems) + i
                }else if(halfWay< currentPage){
                    return (currentPage - halfWay) + i
                }

                return i
            }

            return i
        }
    }
}
</script>

<style scoped>
.rangeInformation{
    margin-top: 28px;
}
</style>
