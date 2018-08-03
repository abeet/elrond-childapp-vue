<template>
  <div>
    <h3>Message 消息提示示例</h3>
    <p>
      <el-button plain @click="open2">成功</el-button>
      <el-button plain @click="open3">警告</el-button>
      <el-button plain @click="open">消息</el-button>
      <el-button plain @click="open4">错误</el-button>
    </p>
    <p>
      Element 为 Message 组件准备了四种通知类型：success, warning, info, error，除此以外的值将被忽略。默认为info。通过type字段来设置，此时正文内容以message的值传入。。同时，也可以在不传入type字段的情况下直接调用。
    </p>
    <p style="height: 3em;"></p>
    <h3>Notification 通知示例</h3>
    <p>
      <el-button plain @click="open5">成功</el-button>
      <el-button plain @click="open6">警告</el-button>
      <el-button plain @click="open7">消息</el-button>
      <el-button plain @click="open8">错误</el-button>
    </p>
    <p>
      Element 为 Notification 组件准备了四种通知类型：success, warning, info，除此以外的值将被忽略, error。默认为info。通过type字段来设置，此时正文内容以message的值传入。。同时，也可以在不传入type字段的情况下直接调用。
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    open() {
      this.$message('这是一条消息提示')
    },
    open2() {
      this.$message({
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      })
    },

    open3() {
      this.$message({
        message: '警告哦，这是一条警告消息',
        type: 'warning'
      })
    },

    open4() {
      this.$message.error('错了哦，这是一条错误消息')
    },
     open5() {
        this.$notify({
          title: '成功',
          message: '这是一条成功的提示消息',
          type: 'success'
        });
      },

      open6() {
        this.$notify({
          title: '警告',
          message: '这是一条警告的提示消息',
          type: 'warning'
        });
      },

      open7() {
        this.$notify.info({
          title: '消息',
          message: '这是一条消息的提示消息'
        });
      },

      open8() {
        this.$notify.error({
          title: '错误',
          message: '这是一条错误的提示消息'
        });
      }
  }
}
</script>
