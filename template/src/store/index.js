import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user // 对应上面 import 的 user，以逗号分割增加
  },
  getters
})
export default store
