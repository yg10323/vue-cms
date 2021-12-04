export default {
    realName: false,// 实名状态
    shopExist: false,// 店铺名是否已被注册
    hasShop: false,//是否已经注册过店铺
    options: [],// 展示级联菜单的数据
    dialogImageUrl: "",//dialog显示的图片
    dialogVisible: false,
    percentage: 0,//控制进度条
    fileFormData: "",// 向服务器提交的数据

    // 对图片进行表单验证
    status: {
        shop_avatar: true,
        shop_business: true,
        shop_health: true,
    },
    // 收集处图片外的数据
    shopInfo: {
        seller_id: "",
        name: "",
        classify: { op_id: "", ch_id: "" },
        address: "",
        start_time: "",
        end_time: "",
        mountain_plan: true,
        service: [],
        delivery: "",
        activities: [{ value: "" }],
    },
    // 验证规则
    rules: {
        name: [
            { required: true, message: "请输入店铺名称", trigger: "blur" },
            { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" },
        ],
        address: [
            { required: true, message: "请输入店铺地址", trigger: "change" },
        ],
        classify: [
            { required: true, message: "请选择店铺分类", trigger: "blur" },
        ],
        start_time: [
            {
                required: true,
                message: "请选择时间",
                trigger: "change",
            },
        ],
        end_time: [
            {
                required: true,
                message: "请选择时间",
                trigger: "change",
            },
        ],
        service: [
            {
                type: "array",
                required: true,
                message: "请至少选择一个服务",
                trigger: "change",
            },
        ],
        delivery: [
            { required: true, message: "请选择配送形式", trigger: "change" },
        ],
    },
}