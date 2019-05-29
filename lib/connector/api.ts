import Axios from "axios";

import * as axios from "axios";

interface pengdingModel {
  tag: string;
  canceler: axios.Canceler;
}

let pending: Array<pengdingModel> = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken: axios.CancelTokenStatic = Axios.CancelToken;

const removePending = (ever: axios.AxiosRequestConfig) => {
  pending.forEach((instance, index) => {
    if (instance.tag === ever.url + "&" + ever.method) {
      //当当前请求在数组中存在时执行函数体
      instance.canceler(); //执行取消操作
      pending.splice(index, 1); //把这条记录从数组中移除
    }
  });
};

const service: axios.AxiosInstance = Axios.create({
  timeout: 100000, // 请求超时时间
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "cache-control": "no-cache",
    cache: "no-cache"
  },
  withCredentials: true, //解决axios不带cookie
  method: "GET",
  data: {}
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
  // TBD
  //  baseURL : ServeAddress + APIBasePath;
});

service.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    // ------------------------------------------------------------------------------------
    removePending(config); //在一个ajax发送前执行一下取消操作
    config.cancelToken = new cancelToken(c => {
      // 这里的ajax标识用请求地址&请求方式拼接的字符串
      pending.push({ tag: config.url + "&" + config.method, canceler: c });
    });
    // -----------------------------------------------------------------------------------------
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  res => {
    if (res.data && res.data.Result) {
      return res.data.Result;
    }
    return res.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
