import Vue from 'vue'
import App from './App.vue'

import store from './store'
import router from './router'

import http from './plugins/http'
import eventbus from './plugins/eventbus'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

import mixins from './utils/mixins'

require('./includes')

Vue.use(http)
Vue.use(eventbus)
Vue.use(ElementUI, {locale})
Vue.mixin(mixins)


new Vue({
    store,
    router,
    el: '#app',
    render: h => h(App)
})
