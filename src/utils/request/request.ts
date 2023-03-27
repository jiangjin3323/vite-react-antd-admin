import axios from "axios";
import { useSelector } from 'react-redux'
// 创建 axios 实例
const instance = axios.create({
  baseURL: "http://localhost:3200/api/v1/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
// 添加请求拦截器
instance.interceptors.request.use(
  async (config) => {
    const token: string | null  = sessionStorage.getItem('TOKEN');
    // 在发送请求之前做些什么
    // console.log("请求拦截器", config);
    config.headers['Authorization'] = token ? token : '';
    return config;
  },
  (error) => {
    console.log(error);
    // 对请求错误做些什么
    // console.log("请求错误", error);
    return Promise.reject(error?.response?.data);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response): any => {
    // 对响应数据做点什么
    // console.log("响应拦截器", response);
    return [null, response.data];
  },
  (error): any => {
    console.log(error);
    // 对响应错误做点什么
    // console.log("响应错误", error);
    return [error?.response?.data, null];
  }
);

export default instance;
