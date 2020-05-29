// 全局API接口地址定义

import router from "@/app/router";
import axios from "axios";

// 设置服务器基础地址
axios.defaults.baseURL = "http://127.0.0.1:88";
// axios.defaults.baseURL = "http://service.letcode.net";

// 设置默认头信息
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 跨域请求设置：是否携带cookie
axios.defaults.withCredentials = true;

// 请求超时时间
axios.defaults.timeout = 10000;

// request 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token,如果存在，则统一在http请求的header都加上token,不用每次请求都手动添加
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = sessionStorage.token;
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);
    }
);

// response 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务状态码不是200的情况
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401 未登录
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 401:
                    console.error("请求错误：401");
                    // this.$message.error(error.response.status.message);
                    router.replace({
                        path: "/login",
                        query: { redirect: router.currentRoute.fullPath }
                    });
                    break;
                // 403 没有权限
                case 403:
                    console.error("请求错误：403");
                    // this.$message.error(error.response.status.message);
                    break;
                // 404 请求不存在
                case 404:
                    // console.log("请求失败：404未找到相关资源");
                    break;
                // 其他错误直接抛出错误提示
                default:
                // Toast({
                //     message: error.response.data.message,
                //     duration: 1500,
                //     forbidClick: true
                // });
            }
            return Promise.reject(error.response);
        }
    }
);



export default {
    /**
     * get方法对应get请求
     * @param {String}url 请求地址
     * @param {Object}params携带参数
     * @returns {Promise}
     */
    get(url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                    params: params
                })
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err.data);
                });
        });
    },
    /**
     * post方法对应post请求
     * @param {String} url 请求地址
     * @param {Object} params 携带参数
     * @returns {Promise}
     */
    post(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, JSON.stringify(params), {headers: {'Content-Type': 'application/json;charset=UTF-8'}})
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err.data);
                });
        });
    },
    put(url, params) {
        return new Promise((resolve, reject) => {
            axios.put(url, JSON.stringify(params), {headers: {'Content-Type': 'application/json;charset=UTF-8'}})
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err.data);
                });
        });
    },
    delete(url, params) {
        return new Promise((resolve, reject) => {
            axios.delete(url, JSON.stringify(params), {headers: {'Content-Type': 'application/json;charset=UTF-8'}})
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err.data);
                });
        });
    }
};
