// 异步载入的组件
const components = {
  '/subroute1/index': () => import(/* webpackChunkName: "subroute1$index" */ '../views/functionModule1/index.vue'),
  '/subroute1/detail': () => import(/* webpackChunkName: "subroute1$detail" */ '../views/functionModule1/detail.vue'),
  '/subroute2/index': () => import(/* webpackChunkName: "subroute2$index" */ '../views/functionModule2/index.vue'),
  '/subroute2/detail': () => import(/* webpackChunkName: "subroute2$detail" */ '../views/functionModule2/detail.vue'),
  '/subroute3/index': () => import(/* webpackChunkName: "subroute3$index" */ '../views/functionModule3/index.vue'),
  '/subroute3/detail': () => import(/* webpackChunkName: "subroute3$detail" */ '../views/functionModule3/detail.vue')
}
export default components
