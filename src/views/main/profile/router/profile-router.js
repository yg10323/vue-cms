export default {
    path: 'profile',
    name: 'profile',
    meta: { name: '个人中心' },
    component: () => import('@/views/main/profile/index.vue'),
    children: [
        {
            path: 'myself',
            name: 'myself',
            meta: { name: '我的信息' },
            component: () => import('@/views/main/profile/web/myself/myself.vue')
        },
        {
            path: 'feedback',
            name: 'feedback',
            meta: { name: '工单反馈' },
            component: () => import('@/views/main/profile/web/feedback/feedback.vue')
        },
        {
            path: 'my_feedback',
            name: 'my_feedback',
            meta: { name: '我的工单' },
            component: () => import('@/views/main/profile/web/feedback/myFeedback.vue')
        },
    ]
}