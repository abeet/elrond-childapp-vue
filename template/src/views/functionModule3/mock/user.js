import Mock from 'mockjs'
import axiosMock from '../../../axiosMock.js'

const users = []
for (let i = 1; i < 11; i++) {
  users.push({
    id: Mock.mock('@increment'),
    userName: Mock.mock('@string(6, 10)'),
    realName: Mock.mock('@cname'),
    status: Mock.mock('@boolean'),
    branch: { id: Mock.mock('@increment'), name: '总公司' },
    roles: [
      { id: Mock.mock('@increment'), name: '用户组', roleCode: 'user' }
    ],
    lastModifyPassTime: Mock.mock('@date'),
    email: Mock.mock('@email'),
    tel: Mock.mock('@integer(11)'),
    phone: '0' + Mock.mock('@integer(11)'),
    remark: ''
  })
}

axiosMock.onGet('/api/users').reply(200, {
  data: users,
  status: 1,
  message: ''
})

axiosMock.onDelete(/api\/users\/.+$/).reply(200, {
  data: null,
  status: 1,
  message: '删除成功'
})

axiosMock.onPut(/api\/users\/modify\/.+$/).reply(200, {
  data: null,
  status: 1,
  message: '操作成功'
})

axiosMock.onPut(/api\/users\/.+$/).reply(200, {
  data: null,
  status: 1,
  message: '操作成功'
})

axiosMock.onPut(/api\/users\/disable\/.+$/).reply(200, {
  data: null,
  status: 1,
  message: '操作成功'
})

axiosMock.onPut('/api/users/password').reply(200, {
  data: null,
  status: 1,
  message: '操作成功'
})

axiosMock.onPut('/api/users').reply(200, {
  data: null,
  status: 1,
  message: '操作成功'
})

axiosMock.onPost('/api/users').reply(200, {
  data: null,
  status: 1,
  message: '添加成功'
})

// 注意，如果还有其他axiosMock拦截配置，请确保所有axiosMock拦截配置执行完之后再执行 axiosMock.onAny().passThrough()
axiosMock.onAny().passThrough()
// 注意，如果还有其他axiosMock拦截配置，请确保所有axiosMock拦截配置执行完之后再执行 axiosMock.onAny().passThrough()
