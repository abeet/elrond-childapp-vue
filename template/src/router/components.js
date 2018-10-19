// 会被编译到app.js中的组件
const components = {
  '/home/index': require('../views/home/index.vue')
  /* 以下组件已经在 asyncComponents.js 里使用异步加载的方式导入
  '/subroute1/index': require('../views/functionModule1/index.vue'),
  '/subroute1/detail': require('../views/functionModule1/detail.vue'),
  '/subroute2/index': require('../views/functionModule2/index.vue'),
  '/subroute2/detail': require('../views/functionModule2/detail.vue'),
  '/subroute3/index': require('../views/functionModule3/index.vue'),
  '/subroute3/detail': require('../views/functionModule3/detail.vue')
  */
}
export default components
