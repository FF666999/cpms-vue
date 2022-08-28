import { setToken, removeToken } from '@/util/auth'
import { setStore, getStore,removeStore} from '@/util/store'
import { isURL, validatenull } from '@/util/validate'
import { deepClone } from '@/util/util'
import webiste from '@/config/website'
import { loginByUsername,  logout, refeshToken } from '@/api/system/user'
import {  getMenu, getTopMenu} from '@/api/system/menu'
function addPath(ele, first) {
  const menu = webiste.menu;
  const propsConfig = menu.props;
  const propsDefault = {
    label: propsConfig.label || 'name',
    path: propsConfig.path || 'path',
    icon: propsConfig.icon || 'icon',
    children: propsConfig.children || 'children'
  };
  const icon = ele[propsDefault.icon];
  ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon;
  const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
  if (!isChild) ele[propsDefault.children] = [];
  if (!isChild && first && !isURL(ele[propsDefault.path])) {
    ele[propsDefault.path] = ele[propsDefault.path] + '/index'
  } else {
    ele[propsDefault.children].forEach(child => {
      addPath(child);
    })
  }

}
const user = {
  state: {
    userInfo: getStore({ name: 'userInfo' }) || {},
    permission: getStore({ name: 'permission' }) || [],
    menu: getStore({ name: 'menu' }) || [],
    token: getStore({ name: 'token' }) || '',
  },
  actions: {
    //根据用户名登录获取token值
    LoginByUsername ({ commit }, userInfo) {
      return new Promise((resolve) => {
        loginByUsername(userInfo).then(res => {
        if(res.success == true) {
          res.obj.userInfo.userAvatar = "/img/bg/touxiang.jpg"
          commit('SET_TOKEN', {"accessToken":res.obj.accessToken,"expire":res.obj.expire});
          commit('SET_USERIFNO',res.obj.userInfo)
          commit('DEL_ALL_TAG');
          commit('CLEAR_LOCK');
        }
          resolve(res.success);
        })
      })
    },
	
    //根据手机号登录
    LoginByPhone ({ commit }, userInfo) {
      // return new Promise((resolve) => {
      //   loginByUsername(userInfo.phone, userInfo.code).then(res => {
      //     const data = res.data.data;
      //     commit('SET_TOKEN', data);
      //     commit('DEL_ALL_TAG');
      //     commit('CLEAR_LOCK');
      //     resolve();
      //   })
      // })
    },
   
    //刷新token
    RefeshToken ({ state, commit }) {
       	return new Promise((resolve, reject) => {
			// refeshToken(state.refeshToken).then(res => {
			//   const data = res.data.data;
			//   commit('SET_TOKEN', data);
			//   resolve(data);
			// }).catch(error => {
			//   reject(error)
			// })
       	})
    },
    // 登出
    LogOut ({ commit }) {
      return new Promise((resolve, reject) => {
		  removeStore({name:"token"})
		  removeStore({name:"menu"})
		  removeStore({name:"userInfo"})
		  removeStore({name:"permission"})
          removeToken()
          resolve()
      })
    },
    
    // 获取顶部菜单信息
    GetTopMenu () {
      return new Promise(resolve => {
        const topMenu = 
        [
          {
            name: webiste.fistPage.label,
            path: webiste.fistPage.value,
            topMenuId:webiste.fistPage.topMenuId,
            icon: "el-icon-s-home",
            meta:{
              menu: true
            }
          }
        ]
        getTopMenu().then((res) => {
          const data = res.obj || []
          data.forEach(e=>{
             let temp ={
                name: e.topMenuName,
                path:e.path,
                icon: e.icon || 'icon-caidan',
                meta:{
                   menu: e.type == 0 ? true : false
                },
                topMenuId:e.topMenuId
             }
             topMenu.push(temp)
          })
          resolve(topMenu)
        })
       
      })
    },
    //获取系统菜单
    GetMenu ({ commit }, topMenuId) {
      return new Promise(resolve => {
        getMenu(topMenuId).then((res) => {
          const data = res.obj
          let menu = deepClone(data.menus);
          menu.forEach(ele => {
            addPath(ele, true);
          })
          if(!topMenuId) {
            commit('SET_PERMISSION', data.buttons)
          }
          commit('SET_MENU', menu)
          resolve(menu)
        })
      })
    },
  },
  
  mutations: {
    SET_TOKEN: (state, token) => {
	  // 保存cookie
      setToken(token.accessToken,token.expire)
      state.token = token;
      setStore({ name: 'token', content: token.accessToken })
    },
    SET_USERIFNO: (state, userInfo) => {
	  state.userInfo = userInfo
      setStore({ name: 'userInfo', content: userInfo })
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
      setStore({ name: 'menu', content: menu })
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = permission;
      setStore({ name: 'permission', content: permission })
    }
  }
}
export default user