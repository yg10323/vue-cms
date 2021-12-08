export default {
    addFood: {
        name: '添加食品',
        url: '/food/add',
        method: 'POST',
    },
    getFoodClassify: {
        name: '获取店铺的食品分类',
        url: '/food/classify',
        method: 'GET'
    },
    getFoodList: {
        name: '获取食品列表',
        url: '/food',
        method: 'GET'
    },
    deleteFood: {
        name: '删除单个食品',
        url: '/food/delete',
        method: 'POST'
    },
    updateFoodInfo: {
        name: '更新食品信息',
        url: '/food/update',
        method: 'POST'
    }
}