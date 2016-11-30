/*const Category = (resolve) => {
    require.ensure(['./main'], () => {
        resolve(require('./main'))
    })
}

const Form = (resolse) => {
    require.ensure(['./form'], () => {
        resolve(require('./form'))
    })
}*/

import Category from './main.vue'
import Form from './form.vue'

const meta = {
    requiresAuth: true
}

export default[
    {
        name: 'category.index',
        path: '/category',
        component: Category,
        meta,
        children: [
            {
                name: 'category.new',
                path: 'create',
                component: Form,
                meta
            },
            {
                name: 'category.edit',
                path: ':id/edit',
                component: Form,
                meta
            }
        ]
    }
]
