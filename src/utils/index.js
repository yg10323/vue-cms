
export default {
    /**
     * 根据角色动态匹配路由
     * @param {Array} menus 
     * @returns Array roleRoutes
     */
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

    /**
     * 级联菜单数据格式化
     * @param {Array} data 
     * @returns Array final
     */
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
     * 对象递归删除空数据, 返回新对象
     * @param {any} data
     * @returns  
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
                if ((res || res === 0) && JSON.stringify(res) !== '[]' && JSON.stringify(res) !== '{}') {
                    newData[key] = res
                }
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
     * 对象深拷贝
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
        let newObj = new obj.constructor()
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = this.deepClone(obj[key])
            }
        }

        return newObj
    },

    /**
     * 格式化时间
     * @param {*} timestamp 
     * @returns 年-月-日 时:分:秒
     */
    formatTime(timestamp) {
        const d = new Date(parseInt(timestamp));    //根据时间戳生成的时间对象
        const date = (d.getFullYear()) + "-" +
            (d.getMonth() + 1) + "-" +
            (d.getDate()) + " " +
            (d.getHours()) + ":" +
            (d.getMinutes()) + ":" +
            (d.getSeconds());
        return date;
    },

    /**
     * 合并相同订单(id在数据库经过排序)
     * @param {Object} orders 
     * @returns Object data
     */
    dealOrderData(orders) {
        let data = this.deepClone(orders);

        let current_id, next_id;
        let foodInfoArray = [];

        for (let i = 0; i < data.length; i++) {
            current_id = data[i].id;
            // next_id为undefined表示数组只有一个元素或遍历到了最后一个元素
            // 当遍历到最后一个元素的时候, 同样需要往foodInfoArray添加一次
            if (data[i + 1]) {
                next_id = data[i + 1].id;
            }
            else {
                foodInfoArray.push(data[i].food_info)
                data[i].food_info = foodInfoArray
                return data;
            }
            // 记录重复id的food_info
            // 当id不相同时, 将foodInfoArray赋值给food_info
            if (current_id === next_id) {
                foodInfoArray.push(data[i].food_info)
                data.splice(i, 1)
                i = i - 1;//i减一为了保证下次遍历从当前下标开始
            } else {
                foodInfoArray.push(data[i].food_info)
                data[i].food_info = foodInfoArray
                foodInfoArray = [];
            }

        }
    },

    /**
     * 合并同一工单的回复
     * @param {Array} feedbackList 
     * @returns new array
     */
    dealFeedback(feedbackList) {
        let data = this.deepClone(feedbackList)
        for (let i = 0; i < data.length; i++) {
            data[i].children = [];
            for (let j = 0; j < feedbackList.length; j++) {
                if (data[i].id == feedbackList[j].id) {
                    continue;
                }
                if (data[i].id == feedbackList[j].belong) {
                    data[i].children.push(feedbackList[j])
                    feedbackList.splice(j, 1);
                    data.splice(j, 1);
                    j -= 1;//保证删除数据后的内层循环从当前j继续
                }
            }
        }
        return data
    }
}