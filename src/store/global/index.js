export default {
    state: {
        isCollapse: false,
        defaultActive: '1000',
    },
    mutations: {
        // 控制侧边栏展开
        changeCollapse(state) {
            state.isCollapse = !state.isCollapse;
        },
        // 控制页面全局刷新
        clearStorage(state) {
            localStorage.clear();
            sessionStorage.clear();
        },
        // 侧边栏的选中状态
        setActive(state, active_id) {
            state.defaultActive = active_id;
            sessionStorage.setItem('defaultActive', active_id);
        }
    }
}