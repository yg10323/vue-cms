export default {
    UserSearchFormConfig: [
        {
            type: 'input', label: 'id', prop: 'id', placeholder: '输入查询的id'
        },
        { type: 'input', label: '账号', prop: 'account', placeholder: '输入查询的账号' },
        {
            type: 'select', label: '角色', prop: 'role', placeholder: '选择查询角色',
            options: [
                // value需和数据库中的表名一致
                { label: '管理员', value: 'admin' },
                { label: '卖家', value: 'seller' },
                { label: '买家', value: 'buyer' },
            ],
            rules: [
                { required: true, message: "请选择角色后进行查询", trigger: "blur" },
            ]
        },
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
    UserTableFormConfig: {
        title: "用户列表",
        isShowIndex: true,
        propList: [
            { prop: "id", label: "id", minWidth: "40", slotName: "id" },
            { prop: "account", label: "用户名", minWidth: "80", slotName: "account" },
            {
                prop: "password",
                label: "密码",
                minWidth: "80",
                slotName: "password",
            },
            { prop: "usable", label: "状态", minWidth: "60", slotName: "usable" },
            { prop: "role_id", label: "角色", minWidth: "40", slotName: "role_id" },
            {
                prop: "createTime",
                label: "创建时间",
                minWidth: "120",
                slotName: "createTime",
            },
            {
                prop: "updateTime",
                label: "更新时间",
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