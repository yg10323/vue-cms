// 导入组件
import {
    Message,
    Button,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Input,
    Empty
} from 'element-ui'

const components = {
    Button,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Input,
    Empty
}


// 遍历注册, 将方法暴露
export default function (Vue) {
    for (const el in components) {
        Vue.use(components[el])
    }

    Vue.prototype.$message = Message
}