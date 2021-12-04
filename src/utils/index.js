// import AMap from 'AMap'

export default {
    // 根据角色动态匹配路由
    mapMenus(menus) {
        const roleRoutes = [];
        const allRoutes = [];

        // 取出所有的路由配置信息
        const routeFiles = require.context('@/views', true, /-router\.js$/)
        routeFiles.keys().forEach(key => {
            const name = routeFiles(key).default.name
            const cpn = routeFiles(key).default
            // name: 一级菜单的name, cpn: 该name下所有的路由信息
            allRoutes.push({ name, cpn })
        })

        // 与后端返回的路由信息进行比对
        // 通过比对一级菜单的name
        for (const menu of menus) {
            const res = allRoutes.find(route => route.name === menu.name)
            if (res) {
                roleRoutes.push(res.cpn)
            }
        }

        return roleRoutes
    },

    // 级联菜单数据格式化
    setOptions(data) {
        const ps = new Map()
        const final = [];
        // 对一级菜单去重
        for (const obj of data) {
            ps.set(obj.op_id, obj.options)
        }
        // 将二级菜单添加至一级菜单中
        ps.forEach((value, key) => {
            const o = {
                value: key,
                label: value,
                children: []
            };

            for (const obj of data) {
                if (obj.op_id === key) {
                    o.children.push({
                        value: obj.ch_id,
                        label: obj.child
                    })
                }
            }

            final.push(o)
        })

        return final
    },

    // 获取城市定位
    getCity() {
        var citysearch = new AMap.CitySearch();
        citysearch.getLocalCity(function (status, result) {
            console.log(status, result);
        });

    },
}