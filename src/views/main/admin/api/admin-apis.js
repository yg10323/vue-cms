export default {
    getSellerMenu: {
        name: '获取role_id为2的菜单',
        url: "/role/2/menu",
        method: 'GET'
    },
    getAdminMenu: {
        name: '获取role_id为1的菜单',
        url: "/role/1/menu",
        method: 'GET'
    },
    adminLogin: {
        name: 'admin登录',
        url: '/role/login',
        method: 'POST',
    }
}