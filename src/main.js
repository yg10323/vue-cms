import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
import registerElement from './plugins/element/element'
import { SoClient } from './plugins/socket/socket'
import { initStore } from './store'
import api from './plugins/axios'
import utils from './utils/index'

Vue.config.productionTip = false

initStore();//页面刷新后初始化vux中的数据
registerElement(Vue);//注册element组件


Vue.prototype.$socket = SoClient.getInstance;
Vue.prototype.$api = api;
Vue.prototype.$utils = utils
// Vue.use(mavonEditor)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
