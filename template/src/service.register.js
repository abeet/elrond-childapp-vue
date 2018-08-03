import {SERVICEID} from './config.js'
import * as service from './service.js'
window.elrondSpa.registerApplication(`service-${SERVICEID}`, service, _ => {
  return window.location.hash.startsWith(`#/${SERVICEID}`)
})
