/*const Login = (resolve) => {
    require.ensure(['./main'], () => {
        resolve(require('./main'))
    })
}*/

import Login from './main.vue'

export default[
    {
        name: 'login.index',
        path: '/login',
        component: Login,
        meta: {requiresAuth: false}
    }
]
