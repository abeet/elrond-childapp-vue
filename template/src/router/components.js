// 会被编译到本app.js中的组件
const components = {
  '/subroute1/index': require('../views/functionModule1/index.vue').default,
  '/subroute1/detail': require('../views/functionModule1/detail.vue').default,
  '/subroute2/index': require('../views/functionModule2/index.vue').default,
  '/subroute2/detail': require('../views/functionModule2/detail.vue').default,
  '/subroute3/index': require('../views/functionModule3/index.vue').default,
  '/subroute3/detail': require('../views/functionModule3/detail.vue').default
}
export default components
