<template>
  <div id="${SERVICEID}" class="${SERVICEID}">
    <App/>
  </div>
</template>
<script>
import {SERVICEID} from '../config.js'
import App from './app.vue'

export default {
  data(){
    return {
      SERVICEID
    }
  },
  components: { App },
}
</script>

