export default {
    state: {
        token: '',
        userInfo: {},
        menus: []
    },
    mutations: {
        // 本地缓存token
        setToken(state, token) {
            state.token = token
            localStorage.setItem('token', JSON.stringify(token))
        },
        setUserInfo(state, userInfo) {
            state.userInfo.account = userInfo.account
            state.userInfo.role_id = userInfo.role_id
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
        },
        // 本地缓存菜单信息
        setMenus(state, menus) {
            state.menus = menus
            localStorage.setItem('menus', JSON.stringify(menus))

            // 1. menus => routes
            // const routes = mapmenussToRoutes(menus)

            // 2. 将routes添加到router > main > children
        },
        // 页面刷新时, 为vuex重新赋值
        loadLocalStorage(state) {
            const token = localStorage.getItem('token')
            if (token) {
                state.token = token
            }
            const userInfo = localStorage.getItem('userInfo')
            if (userInfo) {
                state.userInfo = userInfo
            }
            const menus = localStorage.getItem('menus')
            if (menus) {
                state.menuss = menus
            }
        }
    }
}