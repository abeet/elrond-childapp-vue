const { SERVICEID } = require('../config.js')

// 设置所有路由对应组件别名
const routes = [
  {
    path: `/${SERVICEID}/login`,
    meta: { title: '首页', icon: 'fa fa-user-circle-o' },
    component: '/login/index'
  },
  {
    path: `/${SERVICEID}/subroute1`,
    meta: { title: '功能菜单A', icon: 'fa fa-user-circle-o' },
    component: '/subroute1/index'
  },
  {
    path: `/${SERVICEID}/subroute1/detail`,
    component: '/subroute1/detail'
  },
  {
    path: `/${SERVICEID}/subroute2`,
    meta: { title: '功能菜单B', icon: 'fa fa-comments-o' },
    component: '/subroute2/index'
  },
  {
    path: `/${SERVICEID}/subroute2/detail`,
    component: '/subroute2/detail'
  },
  {
    path: `/${SERVICEID}/subroute3`,
    meta: { title: '功能菜单C', icon: 'fa fa-cog' },
    component: '/subroute3/index'
  },
  {
    path: `/${SERVICEID}/subroute3/detail`,
    component: '/subroute3/detail'
  }
]

module.exports = routes
