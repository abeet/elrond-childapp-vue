<template>
  <div>
    <h3>DatePicker 日期选择示例</h3>
    <p>
      无默认值
      <el-date-picker v-model="value1" type="date" placeholder="选择日期">
      </el-date-picker>
      有默认值
      <el-date-picker v-model="value2" type="date" placeholder="选择日期">
      </el-date-picker>
    </p>
    <p>
      以「日」为基本单位，基础的日期选择控件。
    </p>
    <p style="height: 3em;"></p>
    <h3>DatePicker 选择日期范围示例</h3>
    <p>
      <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
    </p>
    <p>
      可在一个选择器中便捷地选择一个时间范围。
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: '',
      value2: '2018-08-08',
      value6: ''
    }
  },
  methods: {}
}
</script>
