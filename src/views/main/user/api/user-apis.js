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
        method: 'get'
    },
}
