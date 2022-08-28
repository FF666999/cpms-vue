/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios'
import store from '@/store/';
import router from './router'
import { serialize } from '@/util/util'
import { getToken } from '@/util/auth'
import { Message,MessageBox } from 'element-ui'
import website from '@/config/website';
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
axios.defaults.timeout = 10000;
//返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500; // 默认的
};
// 当token失效的时候发起多个请求，记录返回的401状态次数
var unAuth = 0
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
// NProgress Configuration
NProgress.configure({
  showSpinner: false
});
//HTTPrequest拦截
axios.interceptors.request.use(config => {
  NProgress.start() // start progress bar
  const meta = (config.meta || {});
  const isToken = meta.isToken === false;
  if (getToken() && !isToken) {
    config.headers[website.Authorization] = getToken()  // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
  }
  //headers中配置serialize为true开启序列化
  if (config.method === 'post' && meta.isSerialize === true) {
    config.data = serialize(config.data);
  }
  return config
}, error => {
  return Promise.reject(error)
});
//HTTPresponse拦截
axios.interceptors.response.use(res => {
  NProgress.done();
  const status = Number(res.status) || 200;
  const statusWhiteList = website.statusWhiteList || [];
  const message = res.data.message || '未知错误';
  // 处理下载文件的响应信息
  if(res.headers["content-type"].includes("application/octet-stream")){
    let disposition = res.headers["content-disposition"].split("=");
    let content = res.data
    let aTag = document.createElement('a');
    let blob = new Blob([content]);
    aTag.download = disposition[disposition.length-1];
    aTag.href = URL.createObjectURL(blob); // 创建二进制URL对象
    aTag.click();
    URL.revokeObjectURL(blob); // 释放对象URL资源
    return res.data;
  }
  
  //如果在白名单里则自行catch逻辑处理
  if (statusWhiteList.includes(status)) return Promise.reject(res);
  //如果是401表示需要token已过期或不合法需要重新登录 则跳转到登录页面
    if (status === 401) {
	    ++unAuth
	    if(unAuth == 1) {
			MessageBox.confirm(message, {
				confirmButtonText: '重新登录',
				cancelButtonText: '取消',
				showCancelButton:false,
				closeOnClickModal:false,
				showClose:false,
				type: 'warning'
			}).then(() => {
				store.dispatch('LogOut').then(() => {
					router.push({ path: "/login" });
				})
			}).catch(() => {});
	   }
	   return Promise.reject(res)
    }else{
		unAuth = 0
		// 响应非成功状态统一处理
		if (res.data.code !== 20000 && res.data.code !==20008) {
			Message({
			message: message,
			type: 'error'
			})
		}
   }
   return res.data;
}, error => {
  NProgress.done();
  return Promise.reject(new Error(error));
})

export default axios;