
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

    /**
     * 递归删除, 返回新对象
     * @param data 需要处理的数据
     * @returns newData 处理后的数据
     */
    deepRemove(data) {
        // 对非对象进行过滤
        if (typeof data !== 'object') return data
        // 对null undefined 进行过滤
        if (data == undefined) return data
        // 对 RegExp Date Function 进行过滤
        if (data instanceof RegExp) return new RegExp(data)
        if (data instanceof Date) return new Date(data)
        if (data instanceof Function) return new Function(data)
        // 创建对应类型的实例
        let newData = new data.constructor()
        // 递归: 清除所有空串、undefined、null、以及对象属性值为空的属性
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let res = this.deepRemove(data[key])
                // 判断非空属性,并对其进行保留 (0也要保留)
                if ((res || res === 0) && JSON.stringify(res) !== '[]' && JSON.stringify(res) !== '{}') newData[key] = res
            }
        }

        return newData
    },

    // 对deepRemove返回的数据进一步处理
    // 调用此函数
    removeEmpty(data) {
        const res = this.deepRemove(data)
        let finalData;
        // data如果是数组, 可能会出现empty的元素, 对此进行清除
        if (res instanceof Array) {
            finalData = res.filter(item => item || item === 0)
        } else {
            // data是对象,不做处理
            finalData = res
        }

        return finalData
    },

    /**
     * 对象的深拷贝
     * @param  obj 
     * @returns newObj
     */
    deepClone(obj) {
        // 对非对象进行过滤
        if (typeof obj !== 'object') return obj

        // 对null undefined 进行过滤
        if (obj == undefined) return obj

        // 对 RegExp Date Function 进行过滤
        if (obj instanceof RegExp) return new RegExp(obj)
        if (obj instanceof Date) return new Date(obj)
        if (obj instanceof Function) return new Function(obj)


        // 利用constructor进行实例化, 不管是对象还是数组
        // 实例化出的都是各自构造函数的实例, 省去了进行单独判断的步骤
        // 小技巧大学问
        let newObj = new obj.constructor()
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = this.deepClone(obj[key])
            }
        }

        return newObj
    }
}