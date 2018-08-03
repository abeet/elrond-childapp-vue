/**
                   _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\  =  /O
               ____/`---'\____
             .'  \\|     |//  `.
            /  \\|||  :  |||//  \
           /  _||||| -:- |||||-  \
           |   | \\\  -  /// |   |
           | \_|  ''\---/''  |   |
           \  .-\__  `-`  ___/-. /
         ___`. .'  /--.--\  `. . __
      ."" '<  `.___\_<|>_/___.'  >'"".
     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
     \  \ `-.   \_ __\ /__ _/   .-` /  /
======`-.____`-.___\_____/___.-`____.-'======
                   `=---='

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
           佛祖保佑       永无霸葛
           心外无法       法外无心
**/

const { SERVICEID } = require('../config.js')

// 路由设置
const routes = [
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
