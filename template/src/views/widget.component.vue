<template>
  <div>
    <table width="100%">
      <thead>
        <tr>
          <th>
            列一
          </th>
          <th>
            列二
          </th>
          <th>
            列三
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 5" :key="i">
          <td>
            \{{getRandomString()}}
          </td>
          <td>
            \{{getRandomString()}}
          </td>
          <td>
            <a :href="'#/form/subroute4?id='+getRandomString()">查看详情</a>
          </td>
        </tr>
     </tbody>
    </table>
  </div>
</template>

<script>
import {SERVICEID} from '../config.js'

const getRandomString = (n = 10) => {
  const chrs = ' abcdefg hijklmn opq rst uvw xyz '
  let str = ''
  for (let i = 0; i < n; i++) {
    str += chrs[Math.floor(Math.random() * chrs.length)]
  }
  return str.trim()
}
export default {
  data(){
    return {
      SERVICEID
    }
  },
  methods: {
    getRandomString
  }
};
</script>
