import router from '@/router'
import utils from '@/utils'

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
        // 缓存用户信息
        setUserInfo(state, userInfo) {
            state.userInfo.account = userInfo.account
            state.userInfo.role_id = userInfo.role_id
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
        },
        // 本地缓存菜单信息
        setMenus(state, menus) {
            state.menus = menus
            localStorage.setItem('menus', JSON.stringify(menus))

            // 匹配出该角色对应的路由配置并添加路由
            const routes = utils.mapMenus(menus);
            routes.forEach(route => router.addRoute('main', route))
        },
        // 页面刷新时, 为vuex重新赋值
        loadLocalStorage(state) {
            const token = JSON.parse(localStorage.getItem('token'))
            if (token) {
                state.token = token
            }
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))
            if (userInfo) {
                state.userInfo = userInfo
            }
            const menus = JSON.parse(localStorage.getItem('menus'))
            if (menus) {
                // state.menus = menus
                this.commit('setMenus', menus)
            }
            const defaultActive = sessionStorage.getItem('defaultActive')
            if (defaultActive) {
                this.commit('setActive', defaultActive)
            }
        }
    }
}