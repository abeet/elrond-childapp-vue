
// 路由设置

import routes from './routes.js'
import syncComponents from './components.js'
import asyncComponents from './asyncComponents.js'

const components = Object.assign(syncComponents, asyncComponents)

const routers = JSON.parse(JSON.stringify(routes))

const attachComp = arr => {
  arr.forEach(item => {
    if (typeof item.component === 'string' && components[item.component]) {
      item.component = components[item.component]
    }
    if (item.children && item.children.length) {
      attachComp(item.children)
    }
  })
}
attachComp(routers)

export default routers
