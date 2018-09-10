import {SERVICEID} from './config.js'
import * as widget from './widget.js'

window.elrondSpa.registerApplication(`widget-${SERVICEID}`, widget, _ => {
  return !window.location.hash || window.location.hash === '#/'
})
