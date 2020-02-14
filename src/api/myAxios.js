import axios from 'axios';
import qs from 'querystring';
import { message } from 'antd';
import { BASE_URL } from '../config/index';
// 进度条效果
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';

axios.defaults.baseURL = BASE_URL;

// axios请求拦截器
axios.interceptors.request.use(config => {
  Nprogress.start();
  const { method, data } = config;
  // 转化为urlencoded编码形式
  if (method.toUpperCase() === 'POST' && data instanceof Object) {
    config.data = qs.stringify(data);
  }
  return config;
});

// axios响应拦截器
// 响应拦截器里面处理所有的错误
axios.interceptors.response.use(
  response => {
    Nprogress.done();
    return response.data;
  },
  err => {
    Nprogress.done();
    message.warning(err.message);
    // return Promise.reject(error.message);
    return new Promise(() => {});
  }
);
export default axios;
