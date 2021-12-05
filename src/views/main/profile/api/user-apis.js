export default {
    sellerLogin: {
        name: 'seller登录',
        url: "/seller/login",
        method: 'POST'
    },
    sellerRegister: {
        name: "seller注册",
        url: "/seller/register",
        method: 'POST'
    },
    getSellerMenu: {
        name: '获取role_id为2的菜单',
        url: "/role/2/menu",
        method: 'GET'
    },
    getRealName: {
        name: '查询seller实名状态',
        url: "/seller/get_real_name",
        method: 'GET'
    },
    createShop: {
        name: '创建店铺',
        url: '/seller/create_shop',
        method: 'POST'
    },
    getSelfInfo: {
        name: '获取个人信息',
        url: '/seller/self_info',
        method: 'GET'
    },
    updateAuthInfo: {
        name: "跟新实名信息",
        url: '/seller/update/auth',
        method: 'POST'
    },
    deleteAccount: {
        name: '注销账号',
        url: '/seller/delete',
        method: 'DELETE'
    }

}
