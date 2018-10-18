<template>
   <div class="hello">
    <h1>\{{ msg }}权限:\{{role}}</h1>
    <ul>
      <li>
        <el-button type="primary" v-on:click="changeRole">动态修改权限</el-button>
      </li>
    </ul>
  </div>
</template>
<script>
// 根据业务模块命名，和 /api/* 一一对应
import axios from 'axios'
import { mapGetters } from 'vuex'
// import { SERVICEID } from '../../config.js'

export default {
  name: 'home',
  components: {},
  data() {
    return {
      msg: '您当前的',
      role: 'user'
    }
  },
  methods: {
    changeRole() {
      this.$store.dispatch('ChangeRole', this.role).then(response => {
        // const { status, statusText, headers, data } = response
      })
    }
  },
  created: function() {},
  computed: {
    ...mapGetters(['role'])
  }
}
</script>

