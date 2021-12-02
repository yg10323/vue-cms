import Vue from "vue";
import axios from "axios";
import VueRouter from "vue-router";
import { axios_config } from '../../../config.json'

const instance = axios.create({
    baseURL: `${axios_config.host}:${axios_config.port}`,
    timeout: 60 * 1000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    },
});

instance.interceptors.request.use(
    config => {
        const reqObj = config;
        // 在发送请求之前做些什么
        // const reg = /\{(.+?)\}/g; // 匹配{}
        // if (reg.test(reqObj.url)) {
        //     reqObj.url = reqObj.url.replace(reg, Object.values(reqObj.path)[0]);
        // }
        // 发送请求时携带token
        if (localStorage.getItem("token")) {
            reqObj.headers.Authorization = JSON.parse(localStorage.getItem("token"));

        }
        return reqObj;
    },
    err => Promise.reject(err)
);

instance.interceptors.response.use(
    response => {
        // console.log(response)
        // if (response.headers.token) {
        //     sessionStorage.setItem("token", response.headers.token);
        // }
        const res = response.data;
        // 对响应数据做点什么
        // if (res.code !== 200) {
        //     // 401 未认证
        //     if (res.code === 401) {
        //         sessionStorage.clear();
        //         VueRouter.push({
        //             name: "login"
        //         });
        //     }

        //     Vue.prototype.$message.error(res.message);
        //     return Promise.reject(res.message);
        // }
        // console.log(res)
        return res;
    },
    err => Promise.reject(err)
);

Vue.prototype.$axios = instance
export default instance;
