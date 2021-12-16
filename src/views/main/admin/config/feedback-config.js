export default {
    // 搜索表单的配置
    FeedbackSearchFormConfig: [
        {
            type: 'input', label: '卖家id', prop: 'seller_id', placeholder: '输入查询的id'
        },
        { type: 'input', label: '反馈主题', prop: 'title', placeholder: '输入查询的主题' },
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
    FeedbackTableFormConfig: {
        title: "反馈列表",
        isShowIndex: true,
        propList: [
            { prop: "id", label: "id", minWidth: "40", slotName: "id" },
            { prop: "seller_id", label: "卖家id", minWidth: "60", slotName: "seller_id" },
            { prop: "title", label: "主题", minWidth: "80", slotName: "title" },
            { prop: "content", label: "内容", minWidth: "120", slotName: "content" },
            { prop: "feedback_id", label: "回复反馈id", minWidth: "60", slotName: "feedback_id" },
            { prop: "belong", label: "所属主工单", minWidth: "60", slotName: "belong" },
            { prop: "type", label: "类型", minWidth: "70", slotName: "type" },
            {
                prop: "createTime",
                label: "创建时间",
                minWidth: "120",
                slotName: "createTime",
            },
            {
                prop: "updateTime",
                label: "最后更改",
                minWidth: "120",
                slotName: "updateTime",
            },
            {
                label: "操作",
                minWidth: "60",
                slotName: "handle",
            },
        ],
    },
    // 添加用户表单的配置
    FeedbackAddFormConfig: {
        options: ['feedback'],
        feedback: [
            {
                type: 'textarea', label: '回复', prop: 'content', placeholder: '输入回复内容...', clearable: true,
                rows: 10,
                rules: [
                    { required: true, message: "内容不能为空", trigger: "blur" },
                ]
            },
        ],
    }
}