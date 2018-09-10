<template>
  <div>
    <table class="table">
        <tr>
          <th colspan="2">
            <b>\{{$route.query.id}}</b>
          </th>
        </tr>
      <tbody>
        <tr v-for="i in 5" :key="i">
          <td>
            \{{getRandomString()}}
          </td>
          <td>
            \{{getRandomString(50)}}
          </td>
        </tr>
     </tbody>
    </table>
  </div>
</template>

<script>
import {SERVICEID} from '../../config.js'

const getRandomString = (n = 10) => {
  const chrs = ' abcdefg hijklmn opq rst uvw xyz '
  let str = ''
  for (let i = 0; i < n; i++) {
    str += chrs[Math.floor(Math.random() * chrs.length)]
  }
  return str.trim()
}
export default {
  mounted(){
    // console.log(this.$route)
  },
  methods: {
    getRandomString
  }
};
</script>
