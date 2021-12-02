import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import registerElement from './plugins/element/element'
import { SoClient } from './plugins/socket/socket'
import { initStore } from './store'
import api from './plugins/axios'


Vue.config.productionTip = false

initStore();//页面刷新后初始化vux中的数据
registerElement(Vue);//注册element组件


Vue.prototype.$socket = SoClient.getInstance;
Vue.prototype.$api = api;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
