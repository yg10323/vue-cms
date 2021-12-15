export default {
    path: 'admin',
    name: 'admin',
    meta: { name: '系统管理' },
    component: () => import('@/views/main/admin/index.vue'),
    children: [
        {
            path: 'user',
            name: 'user',
            meta: { name: '用户管理' },
            component: () => import('@/views/main/admin/web/user/user.vue')
        },
        {
            path: 'shop',
            name: 'shop',
            meta: { name: '店铺管理' },
            component: () => import('@/views/main/admin/web/shop/shop.vue')
        },
        {
            path: 'order',
            name: 'order',
            meta: { name: '订单管理' },
            component: () => import('@/views/main/admin/web/order/order.vue')
        },
        {
            path: 'feedback',
            name: 'feedback',
            meta: { name: '工单反馈' },
            component: () => import('@/views/main/admin/web/feedback/feedback.vue')
        },
    ]
}