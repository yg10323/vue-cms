export default {
    path: 'shop',
    name: 'shop',
    meta: { name: '我的店铺' },
    component: () => import('@/views/main/shop/index.vue'),
    children: [
        {
            path: 'register',
            name: 'register',
            meta: { name: '注册店铺' },
            component: () => import('@/views/main/shop/web/register/register.vue')
        },
        {
            path: 'info',
            name: 'shopInfo',
            meta: { name: '店铺信息' },
            component: () => import('@/views/main/shop/web/info/info.vue')
        },
        {
            path: 'bill',
            name: 'bill',
            meta: { name: '店铺流水' },
            component: () => import('@/views/main/shop/web/bill/bill.vue')
        },
        {
            path: 'comment',
            name: 'comment',
            meta: { name: '店铺评价' },
            component: () => import('@/views/main/shop/web/comment/comment.vue')
        }
    ]
}