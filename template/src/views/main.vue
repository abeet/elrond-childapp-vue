<template>
  <div :id="SERVICEID" :class="SERVICEID">
    <!-- <h4>这儿是一个子应用，使用Vue编写。</h4> -->
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>
<script>
import { SERVICEID, SERVICENAME } from '../config.js'
import routes from '../router/routes.js'

export default {
  data(){
    return {
      SERVICEID,
      SERVICENAME
    }
  }
}
</script>

