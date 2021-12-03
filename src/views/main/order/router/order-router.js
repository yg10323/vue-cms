export default {
    path: 'order',
    name: 'order',
    meta: { name: '订单中心' },
    component: () => import('@/views/main/order/index.vue'),
    children: [
        {
            path: 'today',
            name: 'today',
            meta: { name: '今日订单' },
            component: () => import('@/views/main/order/web/today/today.vue')
        },
        {
            path: 'all',
            name: 'all',
            meta: { name: '全部订单' },
            component: () => import('@/views/main/order/web/all/all.vue')
        }
    ]
}