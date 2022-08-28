/**
 * 全局配置文件
 */
export default {
  title: "cpms",
  logo: "Cpms",
  key: 'cpms',//配置主键,目前用于存储
  indexTitle: 'Cpms后台开发脚手架',
  lockPage: '/lock',
  tokenTime: 6000,//token过期时间 (单位秒)
  Authorization: 'H-Auth-Token',
  //http的status默认放行不才用统一处理的,
  statusWhiteList: [],
  //配置首页不可关闭
  isFirstPage: false,
  setting: {
    sidebar: 'vertical',
    tag: true,
    debug: true,
    collapse: true,
    search: true,
    lock: true,
    fullscren: true,
    theme: true,
    menu: true,
    color: true,
  },
  fistPage: {
    label: "首页",
    value: "/wel/index",
    params: {},
    query: {},
    meta: {
      menu: true,
    },
    group: [],
    close: false
  },
  //配置菜单的属性
  menu: {
    iconDefault: 'icon-caidan',
    props: {
      alias: 'alias',
      label: 'name',
      path: 'path',
      icon: 'icon',
      menuId:'menuId',
      openFlag: 'openFlag',
      parentId:'parentId',
      component:'component',
      code:'code',
      children: 'children',
      target: 'openFlag'
    }
  }
}