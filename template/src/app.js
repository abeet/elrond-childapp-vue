import { SERVICEID } from './config.js'
import axiosMock from './axiosMock.js'
import Vue from 'vue/dist/vue.min.js'
import VueRouter from 'vue-router'
import menus from './router/routes.js'
import routes from './router/index.js'
import ELEMENT from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './views/app.vue'

Vue.use(VueRouter)
Vue.use(ELEMENT)

const router = new VueRouter({
  mode: 'hash',
  routes
})

window.app = new Vue({
  router,
  el: `#root`,
  render: h => h(App)
})
axiosMock.onAny().passThrough()
