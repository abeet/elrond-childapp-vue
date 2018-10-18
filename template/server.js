const { SERVICEID, SERVICENAME } = require('./src/config.js')
const routes = require('./src/router/routes.js')
const express = require('express')
const request = require('request-promise')
const address = require('network-address')
const getPort = require('get-port')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(express.static('dist'))

app.get('/healthCheck', (req, res) => {
  res.set('Content-Type', 'application/json')
  res.send({
    status: 'success',
    message: 'service is living'
  })
})
;(async function (params) {
  const files = fs.readdirSync(path.join(__dirname, 'dist'))
  let serviceJS
  let widgetJS
  files.forEach(fileName => {
    if (path.extname(fileName) === '.js') {
      if (fileName.match(/service\.\w{8}\.js/)) {
        serviceJS = fileName
      }
      if (fileName.match(/widget[\w]*\.\w{8}\.js/)) {
        widgetJS = fileName
      }
    }
  })

  const port = await getPort({ port: 3000 })
  const ip = address()
  const serviceRegistryUrl = process.env.REGISTRY || 'http://localhost:8000'
  const url = `http://${ip}:${port}`

  const menus = [
    {
      id: SERVICEID,
      name: SERVICENAME,
      children: []
    }
  ]
  for (let route of routes) {
    if (route.path && route.meta && route.meta.title) {
      menus[0].children.push({
        id: route.path.replace(/\//g, '-').replace(/^-/, ''),
        name: route.meta.title,
        link: route.path
      })
    }
  }
  request({
    method: 'POST',
    uri: serviceRegistryUrl + '/service',
    body: {
      service: {
        id: SERVICEID,
        name: SERVICENAME,
        version: '0.1.0',
        framework: 'Vue',
        url: url,
        serviceJS: serviceJS ? `${url}/${serviceJS}` : '',
        menus: menus,
        widgets: [
          // 由于Portal界面的位置有限，每个子应用暂时只允许向Portal界面添加一个widget
          {
            id: `widget-${SERVICEID}-todos`,
            name: '待处理报关单',
            widgetJS: widgetJS ? `${url}/${widgetJS}` : '',
            colSpan: 1, // 为了一屏至少可以显示9个widget，要求占用两列或三列宽的widget需要管理员审核才能生效
            maxHeight: 240 // 为了一屏至少可以显示9个widget，widget的高度超过240部分将被隐藏
          }
        ],
        healthCheck: {
          path: `${url}/healthCheck`
        }
      }
    },
    json: true
  })
    .then(res => {
      console.log(res.message)
    })
    .catch(e => {
      console.error(e.message)
    })
  const server = app.listen(port, _ => {
    console.log('server has started', server.address())
  })
})()
