import Vue from 'vue';
import axios from './router/axios';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router/router';
import './permission'; // 权限
import './error'; // 日志
import './cache';//页面缓冲
import store from './store';
import { loadStyle } from './util/util'
import * as urls from '@/config/env';
import Element from 'element-ui';
import { getStore } from '@/util/store'
import {
  iconfontUrl,
  iconfontVersion
} from '@/config/env';
import i18n from './lang' // Internationalization
import './styles/common.scss';
import basicBlock from './components/basic-block/main'
import basicContainer from './components/basic-container/main'
// import crudCommon from '@/mixins/crud.js'
// window.$crudCommon = crudCommon
Vue.use(router)
Vue.use(VueAxios, axios)
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(window.AVUE, {
  i18n: (key, value) => i18n.t(key, value)
})
//注册全局容器
Vue.component('basicContainer', basicContainer)
Vue.component('basicBlock', basicBlock)
// 加载相关url地址
Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key];
})

// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele));
})

Vue.config.productionTip = false;

/**权限指令**/
Vue.directive('has', {
	bind: function(el, binding) {
		if (!Vue.prototype.$_has(binding.value)) {
		el.parentNode.removeChild(el);
		}
	}
});
 //权限检查方法
Vue.prototype.$_has = function(value) {
	let isExist=false;
	let userAuthList = getStore({ name: "permission"})
   let role = getStore({ name: 'userInfo' }).roles
	if(role){
	 	if((role.filter(e=>e.roleCode == "SUPER_ADMINISTRATOR").length > 0)) {
			return true
		}
	}
	return userAuthList.includes(value)
};

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')