export default {
    // 搜索表单的配置
    ShopSearchFormConfig: [
        {
            type: 'input', label: 'id', prop: 'id', placeholder: '输入查询的id'
        },
        { type: 'input', label: '店铺名', prop: 'name', placeholder: '输入查询的店铺名' },
        {
            type: 'datepicker', label: '日期范围',
            otherOptions: {
                type: 'daterange',
                'range-separator': '至',
                'start-placeholder': '开始日期',
                'end-placeholder': '结束日期'
            },
            prop: 'time'
        }
    ],
    // 表格表单的配置
    ShopTableFormConfig: {
        title: "店铺列表",
        isShowIndex: true,
        propList: [
            { prop: "id", label: "id", minWidth: "40", slotName: "id" },
            { prop: "name", label: "店铺名", minWidth: "80", slotName: "name" },
            {
                prop: "address",
                label: "店铺地址",
                minWidth: "80",
                slotName: "address",
            },
            { prop: "shop_avatar_url", label: "头像", minWidth: "80", slotName: "shop_avatar_url" },
            { prop: "usable", label: "状态", minWidth: "60", slotName: "usable" },
            {
                prop: "delivery",
                label: "配送",
                minWidth: "70",
                slotName: "delivery",
            },
            {
                prop: "start_time",
                label: "营业时间",
                minWidth: "70",
                slotName: "start_time",
            },
            { prop: "notice", label: "公告", minWidth: "60", slotName: "notice" },
            {
                prop: "updateTime",
                label: "最后更改",
                minWidth: "120",
                slotName: "updateTime",
            },
            {
                label: "操作",
                minWidth: "100",
                slotName: "handle",
            },
        ],
    }
}