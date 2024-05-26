import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from './authRoutes'
import { DashboardRoutes } from './dashboard'

const routes = [
    {
        path: '/',
        name: 'AuthLayout',
        component: () =>
            import ('../Layouts/auth/AuthLayout.vue'),
    },
    {
        path: '/',
        name: 'AuthLayout',
        component: () =>
            // import ('../layouts/auth/AuthLayout.vue'),
            import ('../Layouts/auth/AuthLayout.vue'),
        children: [
            ...authRoutes
        ]
    },
    {
        path: '/loading/:message',
        name: 'Loading',
        props: true,
        component: () =>
            import ('../views/LoadingScreen.vue'),
    },
    {
        path: '/',
        name: 'DashboardLayout',
        component: () =>
            // import ('../layouts/dashboard/DashboardLayout.vue'),
            import ('../Layouts/dashboard/DashboardLayout.vue'),
        children: [
            ...DashboardRoutes
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export { router }
