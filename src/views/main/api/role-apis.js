export default {
    roleAll: {
        url: '/role/role/',
        name: '角色列表不分页',
        method: 'GET'
    },
    roleList: {
        url: '/role/role/page',
        name: '角色列表分页',
        method: 'POST'
    },
    roleUserList: {
        url: '/role/role/user',
        name: '获取角色下所有用户列表',
        method: 'POST'
    },
    roleAddUserList: {
        url: '/role/role/user',
        name: '获取角色下可新增用户列表',
        method: 'GET'
    },
    addRole: {
        url: '/role/role/save',
        name: '新增角色',
        method: 'POST'
    },
    editRole: {
        url: '/role/role/upd',
        name: '修改角色',
        method: 'PUT'
    },
    enableRole: {
        url: '/role/role/del/{id}',
        name: '更改状态，删除',
        method: 'DELETE'
    },
    getRole: {
        url: '/role/role/{id}',
        name: '查询角色',
        method: 'GET'
    },
    roleDelUser: {
        url: '/role/role/delUser',
        name: '角色下删除用户',
        method: 'POST'
    },
    roleAppList: {
        url: '/role/role/application',
        name: '查询角色下可新增的应用',
        method: 'GET'
    },
    roleAddUser: {
        url: '/role/role/addUser',
        name: '角色下新增用户',
        method: 'POST'
    },
    appAuthList: {
        url: '/role/permission/application',
        name: '获取应用下的权限列表',
        method: 'GET'
    },
    editAuth: {
        url: '/role/role/updRolePermission',
        name: '角色下修改权限',
        method: 'PUT'
    }
}
