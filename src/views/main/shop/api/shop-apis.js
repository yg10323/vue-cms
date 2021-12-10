export default {
    getClassify: {
        name: '获取店铺分类',
        url: "/shop/get_classify",
        method: 'GET',
    },
    getShopExist: {
        name: '查询店铺名是否被注册',
        url: '/shop/shop_exist',
        method: 'POST',
    },
    getHasShop: {
        name: '查询是否已经注册过店铺',
        url: '/shop/has_shop',
        method: 'GET',
    },
    getShopInfo: {
        name: '获取店铺信息',
        url: '/shop/info',
        method: 'GET',
    },
    updateShopInfo: {
        name: '更新店铺信息',
        url: '/shop/update',
        method: 'POST'
    },
    updateActivities: {
        name: '更新店铺活动',
        url: '/shop/update/activities',
        method: 'POST'
    },
    getOrdersToday: {
        name: '获取店铺今日订单',
        url: '/shop/orders/today',
        method: 'GET'
    },
    getOrdersAll: {
        name: '获取店铺所有订单',
        url: '/shop/orders/all',
        method: 'GET'
    },
    getBillInfo: {
        name: '获取流水等信息',
        url: '/shop/bill',
        method: 'GET'
    }
}