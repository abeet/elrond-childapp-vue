import axios from 'axios'
import Vue from 'vue'
import { Message } from 'element-ui'
import store from '../store/index'
import { getToken } from './auth'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  timeout: 15000, // 请求超时时间
  withCredentials: true // 跨域请求携带凭据
})

// request 请求拦截器
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters && store.getters.token) {
      config.headers = config.headers || {}
      let token = getToken()
      if (token){
        config.headers['X-Token'] = token // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
      }
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone 响应拦截器
service.interceptors.response.use(
  response => response,
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
  error => {
    const { status, statusText, headers, data } = error.response
    const errortext = codeMessage[status] || statusText
    console.log(
      'response：' + status + '~' + statusText + '~' + headers + '~' + data
    ) // for debug
    Message({
      message: errortext,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
Vue.prototype.$http = service // 注册全局service

export default service
