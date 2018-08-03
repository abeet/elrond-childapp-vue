<template>
  <div>
    <h3>接口返回假数据（mock）示例</h3>
    <div style="padding: 10px;">
      <el-button icon="plus">添加</el-button>
      <el-button icon="edit" :disabled="selectedRows.length !== 1">编辑</el-button>
      <el-button icon="circle-close" :disabled="!(selectedRows.length === 1 && selectedRows[0].status)">停用</el-button>
      <el-button icon="circle-check" :disabled="!(selectedRows.length === 1 && !selectedRows[0].status)">启用</el-button>
      <el-button icon="delete" :disabled="selectedRows.length === 0">删除</el-button>
    </div>
    <el-table :data="users" ref="userDataTable" @selection-change="onSelectionChange" stripe tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" width="30" align="center"></el-table-column>
      <el-table-column prop="userName" label="用户名" min-width="15%"></el-table-column>
      <el-table-column prop="realName" label="真实姓名" min-width="15%"></el-table-column>
      <el-table-column label="用户状态" min-width="10%">
        <template slot-scope="scope">
          <i class="fa fa-check icon-success" v-if="scope.row.status"></i>
          <i class="fa fa-times icon-danger" v-else></i>
        </template>
      </el-table-column>
      <el-table-column label="所属机构" min-width="15%">
        <template slot-scope="scope">
          <span>{{scope.row.branch.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属角色" min-width="50%">
        <template slot-scope="scope">
          <span v-for="role in scope.row.roles" :key="role.roleCode">{{role.name}} </span>
        </template>
      </el-table-column>
      <el-table-column prop="lastModifyPassTime" label="最后修改密码时间" min-width="20%"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { SERVICEID } from '../../config.js'
import axios from 'axios'
import './mock/user.js'

export default {
  data() {
    return {
      SERVICEID,
      selectedRows: [],
      users: []
    }
  },
  computed: {
    disableOrEnable: function() {
      if (this.selectedRows.length !== 1) {
        return ''
      }

      return this.selectedRows[0].status ? '停用' : '启用'
    }
  },
  async created() {
    let res = await axios.get('/api/users')
    this.users = res.data.data
  },
  methods: {
    onSelectionChange(selection) {
      this.selectedRows = selection
    }
  }
}
</script>
