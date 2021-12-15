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
        method: 'POST'
    },
    deleteAdmin: {
        name: '根据id删除admin',
        url: '/role/admin/delete',
        method: 'POST'
    },
    deleteSeller: {
        name: '根据id删除seller',
        url: '/role/seller/delete',
        method: 'POST'
    },
    deleteBuyer: {
        name: '根据id删除buyer',
        url: '/role/buyer/delete',
        method: 'POST'
    },
    getUserByQuery: {
        name: '根据query获取admin/seller/buyer',
        url: '/role/user/by_query',
        method: 'POST'
    },
    changeUserUsable: {
        name: '更改user的usable',
        url: '/role/user/usable',
        method: 'POST'
    },
    addUser: {
        name: '添加user',
        url: '/role/user/add',
        method: 'POST'
    }
}