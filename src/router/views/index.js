import Layout from '@/page/index/'
// 非菜单路由配置
export default [
{
  path: '/wel',
  component: Layout,
  redirect: '/wel/index',
  children: [{
    path: 'index',
    name: '首页',
    meta: {
      menu: true,
    },
    component: () =>
      import('@/views/wel/index')
  }]
},
{
  path: '/info',
  component: Layout,
  redirect: '/info/index',
  children: [{
    path: 'index',
    name: '个人信息',
    meta: {
      menu: true,
    },
    component: () =>
      import('@/views/user/info')
  }, 
  {
      path: 'setting',
      name: '个人设置',
      meta: {
        menu: true,
      },
      component: () =>
        import('@/views/user/setting')
  }],
}]