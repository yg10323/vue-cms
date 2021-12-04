// 导入组件
import {
    Message,
    Button,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Input,
    Empty,
    Container,
    Aside,
    Header,
    Main,
    Menu,
    MenuItem,
    MenuItemGroup,
    Submenu,
    Row,
    Col,
    Select,
    Option,
    DatePicker,
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Breadcrumb,
    BreadcrumbItem,
    Table,
    TableColumn,
    Pagination,
    Backtop,
    Divider,
    Link,
    Dialog,
    Scrollbar,
    Cascader,
    TimeSelect,
    Switch,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    Popover,
    Upload,
    Progress

} from 'element-ui'

const components = {
    Button,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Input,
    Empty,
    Container,
    Aside,
    Header,
    Main,
    Menu,
    MenuItem,
    MenuItemGroup,
    Submenu,
    Row,
    Col,
    Select,
    Option,
    DatePicker,
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Breadcrumb,
    BreadcrumbItem,
    Table,
    TableColumn,
    Pagination,
    Backtop,
    Divider,
    Link,
    Dialog,
    Scrollbar,
    Cascader,
    TimeSelect,
    Switch,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    Popover,
    Upload,
    Progress


}


// 遍历注册, 将方法暴露
export default function (Vue) {
    for (const el in components) {
        Vue.use(components[el])
    }

    Vue.prototype.$message = Message
}