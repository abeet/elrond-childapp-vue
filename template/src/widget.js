import {SERVICEID} from './config.js'
import Vue from 'vue/dist/vue.min.js'
import VueRouter from 'vue-router'
import elrondSpaVue from './elrond-spa-vue.js'
import Widget from './views/widget.component.vue'

Vue.use(VueRouter)
const router = new VueRouter()

const widgetId = `widget-${SERVICEID}-todos`
const vueLifecycles = elrondSpaVue({
  Vue,
  appOptions: {
    router,
    el: `#${widgetId}`,
    template: `<div id="${widgetId}" class="${widgetId}">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">待处理报关单</h3>
      </div>
      <div class="panel-body">
        <component-widget></component-widget>
      </div>
    </div>
    </div>`,
    components: {
      'component-widget': Widget
    }
  }
})

export function bootstrap(props) {
  return vueLifecycles.bootstrap(props)
}

export function mount(props) {
  return vueLifecycles.mount(props)
}

export function unmount(props) {
  return vueLifecycles.unmount(props)
}
