export default {
    // 搜索表单的配置
    OrderSearchFormConfig: [
        // {
        //     type: 'input', label: '店铺名', prop: 'id', placeholder: '输入查询的id'
        // },
        { type: 'input', label: '订单号', prop: 'order_number', placeholder: '输入查询的订单' },
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
    OrderTableFormConfig: {
        title: "订单列表",
        isShowIndex: true,
        propList: [
            { prop: "id", label: "id", minWidth: "40", slotName: "id" },
            { prop: "buyer_id", label: "买家id", minWidth: "60", slotName: "buyer_id" },
            {
                prop: "order_number",
                label: "订单编号",
                minWidth: "80",
                slotName: "order_number",
            },
            { prop: "pay_mode", label: "支付方式", minWidth: "80", slotName: "pay_mode" },
            { prop: "total_price", label: "订单金额", minWidth: "60", slotName: "total_price" },
            {
                prop: "pay_price",
                label: "支付金额",
                minWidth: "70",
                slotName: "pay_price",
            },
            {
                prop: "done",
                label: "订单状态",
                minWidth: "70",
                slotName: "done",
            },
            {
                prop: "update_flag",
                label: "日期归属",
                minWidth: "60",
                slotName: "update_flag",
            },
            {
                prop: "createTime",
                label: "下单时间",
                minWidth: "100",
                slotName: "createTime",
            },
            {
                prop: "updateTime",
                label: "完成时间",
                minWidth: "100",
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