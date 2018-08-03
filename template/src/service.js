import {SERVICEID} from './config.js'
import Vue from 'vue/dist/vue.min.js'
import VueRouter from 'vue-router'
import elrondSpaVue from './elrond-spa-vue'
import menus from './router/routes.js'
import routes from './router/index.js'
import ELEMENT from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Main from './views/main.vue'

Vue.use(VueRouter)
Vue.use(ELEMENT)

const router = new VueRouter({
  mode: 'hash',
  routes
})

const vueLifecycles = elrondSpaVue({
  Vue,
  appOptions: {
    router,
    el: `#${SERVICEID}`,
    render: h => h(Main)
  }
})

export function bootstrap (props) {
  return vueLifecycles.bootstrap(props)
}

export function mount (props) {
  return vueLifecycles.mount(props)
}

export function unmount (props) {
  return vueLifecycles.unmount(props)
}
