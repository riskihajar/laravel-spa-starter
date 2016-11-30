import Dashboard from './main.vue'

export default[
    {
        name: 'dashboard.index',
        path: '/',
        component: Dashboard,
        meta: {requiresAuth: true}
    },
    {
        name: 'catchall',
        path: '*',
        component: Dashboard,
        meta: {requiresAuth: true}
    }
]
