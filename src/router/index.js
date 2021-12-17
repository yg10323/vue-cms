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
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})


// 避免冗余导航 （重复点击菜单栏报错问题）
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

// 全局导航守卫
router.beforeEach((to, from, next) => {
    // 前往非登录页之前判断有无登录
    if (to.path !== '/login') {
        const token = localStorage.getItem('token')
        if (!token) {
            next({ path: '/login' })
        }

    }

    // 重定向显示overview
    if (to.path === '/main') {
        const path = JSON.parse(localStorage.getItem('menus'))[0].path
        next({ path })
    }

    next()
})


export default router
