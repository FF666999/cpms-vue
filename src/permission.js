/**
 * 全站权限配置
 * 
 */
import router from './router/router'
import store from './store'
import { validatenull } from '@/util/validate'
import { getToken } from '@/util/auth'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false });
const lockPage = store.getters.website.lockPage; //锁屏页
const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  const meta = to.meta || {};
  const isMenu = meta.menu === undefined ? to.query.menu : meta.menu;
  store.commit('SET_IS_MENU', isMenu === undefined);
    if (getToken()) {
		if (store.getters.isLock && to.path != lockPage) { //如果系统激活锁屏，全部跳转到锁屏页
		next({ path: lockPage })
		} else if (to.path === '/login') { //如果登录成功访问登录页跳转到主页
		next({ path: '/' })
		} else {
			const value = (to.query.src || to.fullPath) + to.hash;
			const label = to.query.name || to.name;
			const meta = to.meta || router.$avueRouter.meta || {};
			const i18n = to.query.i18n;
			// if (meta.target) {
			// 	// 新窗口打开
			// 	window.open(value, value)
			// 	return
			// } else 
			if (meta.isTab !== false && !validatenull(value) && !validatenull(label)) {
				store.commit('ADD_TAG', {
					label: label,
					value: value,
					params: to.params,
					query: to.query,
					meta: (() => {
						if (!i18n) {
							return meta
						}
						return {
							i18n: i18n
						}
					})(),
					group: router.$avueRouter.group || []
				});
			}
			
			next()
		}
    } else {
      	//判断是否需要认证，没有登录访问去登录页
	  	if (whiteList.indexOf(to.path) !== -1) {
			next()
		} else {
			next(`/login?redirect=${to.path}`)
			NProgress.done()
		}
    }
})

router.afterEach(() => {
  NProgress.done();
  let title = store.getters.tag.label;
  let i18n = store.getters.tag.meta.i18n;
  title = router.$avueRouter.generateTitle(title, i18n)
  //根据当前的标签也获取label的值动态设置浏览器标题
  router.$avueRouter.setTitle(title);
});