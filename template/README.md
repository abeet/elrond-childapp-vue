微服务Portal子应用脚手架工程（基于vue）
====================================

### 概述
对于不同JS框架编写的单页应用在同一页面上共存，本方案使用到单页应用管理器`elrond`来管理，它管理的子应用应该实现`bootstrap`、`mount`、`umount`三个生命周期。

### 运用到的工具、框架或库：
- **[VueJS 2.x](https://github.com/vuejs/vue)**
- [Vue-router](https://github.com/vuejs/vue-router)
- [axios](https://github.com/mzabriskie/axios)
- **[Element UI 2.x](https://github.com/ElemeFE/element)**
- [Babel](https://babeljs.io/)
- [Webpack](https://github.com/webpack/webpack)

## 开发流程：
1. 克隆本脚手架前端工程，确认`src/config.js`里的SERVICEID配置是否正确，确认`server.js`里要发送给注册中心的菜单配置是否正确。
1. 根据项目实际需求，配置路由和菜单，准备各路由所对应的vue文件，vue文件内容为空白，待分配给项目成员实现。
1. 在mock目录下准备mock数据，设计好数据结构（控件需要的数据结构）和字段名（最好同数据库中表结构字段名，并使用驼峰式命名）
1. 实现vue文件的界面部分，使用axios-mock-adapter来拦截ajax请求，返回mock数据。
1. 后端实现RESTful接口，并维护接口文档（在doc目录下维护raml格式接口文档或使用 http://apizza.cc 在线文档服务）
1. 前端取消axios-mock-adapter拦截，调试后端接口。

## 注意事项
1. JS风格使用`JavaScript Standard Style`，建议使用VSCode作为js/vue的编辑器，并安装以下插件`EditorConfig for VSCode` , `Prettier-Standard - JavaScript formatter` , `JavaScript Standard Style` , `stylefmt` , `Vetur`。
    并且vscode的配置里要加下面的命令，防止格式化时自动加分号。   
    `  "prettier.singleQuote": true,`  
    `  "prettier.semi": false,`  
1. 在开发界面时使用ElementUI提供的栅格系统（24列），对界面进行响应式布局，以便移动端访问。
1. 不要使用ElementUI提供的图标组件，使用Font Awesome 图标。
1. 后端接口符合RESTful规范
1. 注意后端返回前端的数据，字段名同数据库中的字段名，并转为小写字母开头的驼峰式命名，构造mock数据时也要注意这一点。
1. 工程编译时，`source`目录下的`lib`、`assets`目录下的文件会被直接复制到`dist`目录下。
1. 为了便于维护，对话框、页签等如果里面的内容比较多（超过30行），要独立成vue组件，尽量不要让一个vue组件的代码太多（超过500行超过20K）,尽量把vue文件里的js移到单独的文件，便于使用编辑器的js校验/js格式化功能。vue文件中css代码行数较多时（超过50行），亦可将css移到单独的css文件。模板部分要保持在vue文件里，以使用Vetur插件的模板语法校验功能。

##### 防JS冲突规范
1. 为了防止子应用冲突，所有子应用不要直接创建全局方式，不要创建全局变量
2. 子应用创建的方法或变量，都要放到子应用ID的命名空间下，例如
```js
import {SERVICEID} from './config.js'
let ns = window[SERVICEID] = window[SERVICEID] || {}
ns.foo = { bar: 'val1', baz: 'val2'}
ns.qux = (a, b) => {}
```
##### 防本地存储溢出规范

1. Chrome下每个域名只能存50个`cookie`，最多4K数据。
   为了防止cookie存储溢出，普通子应用不要用`cookie`存储数据（系统后台会清掉各子应用写的`cookie`来强制禁止使用cookie），
   特殊情况经与平台管理员联系后可开放有限的`cookie`写权限。  
2. 在脚手架工程下提供cookie的前后端操作库(`src/utils/cookies.js`)，接管cookie操作。 前端使用此库读写cookie，实际上是读写localStorage中的数据，防止cookie中数据溢出。 各子应用的读写是隔离的，不会互相覆盖。 前端js会在合适的时机同步localStorage中的cookie数据到服务器端，让服务器端的cookie数据和前端同步。

```js
import { SERVICEID } from './config.js'
import Cookies from './utils/cookies.js'

Cookies.setServiceId(SERVICEID)
Cookies.set('name', 'value'); // 永不过期
Cookies.set('name', 'value', { expires: 7 }); // 过期时间7天
Cookies.get('name'); // => 'value'
Cookies.remove('name');
Cookies.get('name'); // => undefined
```

##### 防本地存储冲突规范

1. Chrome下`sessionStorage` `localStorage`的容量为5M。超过5M后将无法写入。
2. 各子应用尽量用`sessionStorage`代替`localStorage`，防止`localStorage`膨胀
3. 各子应用不要向`localStorage`存储大量数据（超过100K）
4. 为了防止子应用冲突，所有子应用向`localStorage`里读写数据时，必须带上子应用ID为前缀例如

```js
import {SERVICEID} from './config.js'
localStorage.setItem(`${SERVICEID}.foo`, 'value')
localStorage.setItem(`${SERVICEID}.foo.bar`, 'value')
```

##### 跨子应用数据交互规范

1. 在`index.js`里我们定义了`portal.global`为一个`Observable`实例，`Observable`是`订阅/发布模式`的实现，所以`portal.global`支持
`get`
`set`
`subscribe`
`unsubscribe`
等方法
```js
function callback(value, path) {
  console.log(value, path);
}

portal.global.set('foo', { bar: 'value' }) // 改变属性foo的值
portal.global.set('foo.bar', 'newValue') // 改变属性 foo.bar的值
portal.global.get('foo') // 获取属性foo 的值
portal.global.get('foo.bar') // 获取属性bar 的值 
portal.global.subscribe('foo', callback) // 监听foo属性的改变
portal.global.subscribe('foo.bar', callback) // 监听bar属性的改变
portal.global.unsubscribe('foo', callback) // 停止监听 foo 属性的改变
portal.global.unsubscribe('foo.bar', callback) // 停止监听 bar 属性的改变
```
2. 子应用可以在`bootstrap`生命周期函数中声明自己的跨服务数据项。声明方式类似于：  
```js
  portal.global.set("form.count",1)
```
3. 其他子界面可以在自己的bootstrap生命周期函数中声明要监听跨服务业数据项。声明方式类似于：
```js
  portal.global.subscribe("form.count",function(value, path){
	  //获取value做相应动作
  });
```
##### 链接跳转规范
1. 子应用里的链接要设置属性`target="_blank"`，使页面在新窗口打开。
2. 集成页面的js会遍历没有设置属性为`target="_blank"`的链接，并禁止这些链接在当前窗口打开。

##### 全局样式规范
1. 在集成页面已经引入`bootstrap.css`,并且会对`Bootstrap`样式作统一调整，因此所有子应该尽量使用`Bootstrap`样式，并且不要自己再引入`bootstrap.css`。参见`Bootstrap`文档 http://v3.bootcss.com/css/#type-headings


## 目录说明

```
./
│  package.json                    前端工程配置文件
│  server.js                       启动http服务，使用js可被访问，向注册中心注册子应用id、js路径等信息
│  webpack.config.js               webpack配置文件
│
├─dist                            js发布目录
│  │      app.fobarxxx.js         webpack编译得到的子应用的JS（可独立运行）
│  │      service.fobarxxx.js     webpack编译得到的子应用的JS（集成到Portal）
│  │      widget.fobarxxx.js      webpack编译得到的Portal小部件的JS（集成到Portal）
│  │
│  └─assets                      资源目录，存放字体、图片等比较大没有打包到js中的资源
└─src                             js源码目录
   │  index.html              主入口静态页（）
   │  app.js                  主入口js
   │  login.html              登录页静态页
   │  login.js                登录页js
   │  config.js               一些全局配置
   │  
   ├─router                   路由配置
   ├─directives               自定义指令
   ├─filters                  自定义过滤器
   ├─mixins                   公共mixins
   ├─store                    公共状态管理
   ├─utils                   公共js工具方法/类
   │      request.js
   │      ......
   ├─components               公共组件
   │      toolbar.vue
   │      ......
   ├─lib                      第三方库，供页面用<script>引入，不会编译，直接复制到发布目录
   │      vue.min.js
   │      vue-router.min.js
   │      axios.min.js
   │      ......
   ├─assets                   资源目录，不会编译，直接复制到发布目录
   │  ├─css                   公共样式及第三方样式库，页面用<link>引入
   │  ├─fonts                 图标字体
   │  └─images                图片
   └─views                    所有页面视图
      │   app.vue                app主视图组件
      │
      ├─functionmodule-1
      │  ├─components 
      │  └─mock
      │      ......
      ├─functionmodule-2
      │  ├─components 
      │  └─mock
      │      ......
      ├─functionmodule-3
      │  ├─components 
      │  └─mock
      │      ......
      ├─functionmodule-4
      │  ├─components 
      │  └─mock
      │      ......
      └─error                    404、505等错误提示视图
```

## 开发与构建命令
建议使用`yarn`最新版本，下载地址 https://yarnpkg.com/latest.msi  
建议使用淘宝的npm仓库镜像，安装npm包速度更快：  
``` bash
# 使用淘宝的npm仓库镜像   
npm config set registry https://registry.npm.taobao.org

```

``` bash
# 安装依赖   
yarn install

# 进入开发模式，启动前台应用，localhost:3000 。监听vue文件改动自动刷新浏览器  
yarn run dev
yarn run start

# 构建文件到dist目录供发布  
yarn run build

```

## 链接
JavaScript Standard 代码规范  
https://github.com/standard/standard/blob/master/docs/README-zhcn.md  

VUE 2 文档  
https://cn.vuejs.org/v2/api/  

Vue Router 2 文档  
https://router.vuejs.org/zh-cn/  

Element-UI 文档  
http://element.eleme.io/#/zh-CN/component/layout  

axios 介绍  
https://github.com/mzabriskie/axios/blob/master/README.md  

Font Awesome 图标  
~~http://fontawesome.io/icons/~~  
https://www.thinkcmf.com/font/font_awesome/icons.html   

RAML 1.0 文档  
https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md  

