<template>
   <div class="hello">
    <h3>\{{ msg }}：</h3>
    <p>用户名：\{{ name }} 权限：\{{roles}}</p>
    <ul>
      <li>
        <el-button type="primary" size="medium" v-on:click="getUserInfo">获取用户信息</el-button>
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
      msg: '用户信息',
      token: 'ss'
    }
  },
  methods: {
    getUserInfo() {
      this.$store.dispatch('GetUserInfo', this.token).then(response => {
        // const { status, statusText, headers, data } = response
      })
    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  }
}
</script>

