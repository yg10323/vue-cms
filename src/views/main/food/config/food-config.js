export default {

    add_config: {
        hasShop: '',

        // 显示食品分类
        options: [],

        // 图片验证
        food_avatar: true,

        // 除图片外的信息
        foodForm: {
            shop_id: '',
            name: '',
            price: '',
            discount: '',
            extra: '',
            least: 1,
            single_point: false,
            foodClassify: [],
        },
        // 最终上传的数据
        fileFormData: "",
        // 验证规则
        rules: {
            name: [
                { required: true, message: "请输入食品名称", trigger: "blur" },
                { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" },
            ],
            price: [
                { required: true, message: "请输入食品价格", trigger: "change" },
            ],
            foodClassify: [
                { required: true, message: "请选择/添加食品分类", trigger: "blur" },
            ],
            discount: [
                { required: true, message: "请输入食品折扣", trigger: "change" },
            ],
            extra: [
                { required: true, message: "请输入打包费", trigger: "change" },
            ],

        },

        // 请求头
        config: {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    },

    detail_config: {



        options: [],
        originData: "",

        fileFormData: "",

        foodForm: {
            name: '',
            price: '',
            discount: '',
            extra: '',
            least: 0,
            single_point: false,
            foodClassify: [],
            desci: '',
            tips: '',
            package_content: '',
            main_material: '',
            secondary_material: '',
            meat_vegetable: '',
            weight: '',
            flavor: '',
        },

        axios_config: {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    }
}