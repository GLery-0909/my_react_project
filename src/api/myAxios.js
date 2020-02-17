import axios from 'axios';
import qs from 'querystring';
import { message } from 'antd';
import { BASE_URL } from '../config/index';
// 进度条效果
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '../redux/store';
import { createDeleteTitleAction } from '../redux/actions/header';
import { createDeleteUserInfoAction } from '../redux/actions/login';

axios.defaults.baseURL = BASE_URL;

// axios请求拦截器
axios.interceptors.request.use(config => {
  if (store.getState().userInfo.token) {
    const { token } = store.getState().userInfo;
    config.headers.Authorization = 'atguigu_' + token;
  }
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
    // 401错误 登录过期
    if (err.response.status === 401) {
      message.error('请重新登录!');
      store.dispatch(createDeleteTitleAction());
      store.dispatch(createDeleteUserInfoAction());
    } else {
      message.error('请求失败，请联系管理员！');
    }
    return new Promise(() => {});
  }
);
export default axios;
