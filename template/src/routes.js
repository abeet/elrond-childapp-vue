import {SERVICEID} from './config.js'
import SubModule1 from './views/functionModule1/index.vue'
import SubModule2 from './views/functionModule2/index.vue'
import SubModule3 from './views/functionModule3/index.vue'
import Detail1 from './views/functionModule1/detail.vue'
import Detail2 from './views/functionModule2/detail.vue'
import Detail3 from './views/functionModule3/detail.vue'

export default [
  { path: `/${SERVICEID}/subroute1`, component: SubModule1 },
  { path: `/${SERVICEID}/subroute2`, component: SubModule2 },
  { path: `/${SERVICEID}/subroute3`, component: SubModule3 },
  { path: `/${SERVICEID}/detail1`, component: Detail1 },
  { path: `/${SERVICEID}/detail2`, component: Detail2 },
  { path: `/${SERVICEID}/detail3`, component: Detail3 }
]
