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
    ]
}