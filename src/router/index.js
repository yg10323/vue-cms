import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/main'
    },
    {
        path: "/main",
        name: "main",
        component: () => import('@/views/main/main')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index')
    },

    {
        path: "*",
        name: "404",
        component: () => import('@/views/404')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


// 全局导航守卫
router.beforeEach((to, from, next) => {
    // 前往非登录页之前判断有无登录
    if (to.path !== '/login') {
        const token = JSON.parse(localStorage.getItem('token'))
        if (!token) {
            next({ path: '/login' })
        }
    }

    // 重定向显示overview > map-menu > 19行
    // if (to.path === '/main') {
    //     next({ path: firstMenu.path })
    // }

    next()
})


export default router
