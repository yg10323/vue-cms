export default {
    path: 'food',
    name: 'food',
    meta: { name: '食品中心' },
    component: () => import('@/views/main/food/index.vue'),
    children: [
        {
            path: 'add',
            name: 'add',
            meta: { name: '新增食品' },
            component: () => import('@/views/main/food/web/add/add.vue')
        },
        {
            path: 'info',
            name: 'foodInfo',
            meta: { name: '食品列表' },
            component: () => import('@/views/main/food/web/info/info.vue')
        },
    ]
}