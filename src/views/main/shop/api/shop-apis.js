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
    }
}