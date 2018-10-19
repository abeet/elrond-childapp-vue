import { SERVICEID } from './config.js'
import Cookies from './utils/cookies.js'
import LocalStorage from './utils/storage.js'
// import axiosMock from './axiosMock.js'
import Vue from 'vue'
import VueRouter from 'vue-router'
import './router/routes.js'
import routes from './router/index.js'
import store from './store/index.js'
import ELEMENT from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './views/app.vue'
import Vuex from 'vuex'

Cookies.setServiceId(SERVICEID)
LocalStorage.setServiceId(SERVICEID)

// 以下向window添加全局变量，如果有正确配置ESLint，应该会显示ESLint警告
// window.asdf = 123
// window['asdf'] = 123
// 以下添加cookie，如果有正确配置ESLint，应该会显示ESLint警告
// document.cookie = 'asdf=123'

Vue.use(VueRouter)
Vue.use(ELEMENT)
Vue.use(Vuex)

const router = new VueRouter({
  mode: 'hash',
  routes
})

new Vue({
  router,
  store,
  el: `#root`,
  render: h => h(App)
})
// axiosMock.onAny().passThrough()
