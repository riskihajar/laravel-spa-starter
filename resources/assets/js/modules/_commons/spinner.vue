<template>
    <div v-loading.fullscreen.lock="fetching"></div>
</template>

<script>
import {mapState} from 'vuex'

export default{
    computed: {
        ...mapState(['fetching'])
    }
}
</script>
