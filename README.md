# elrond-childapp-vue

基于 zcf+vue 的单页面后台管理系统脚手架的模板

## 安装

这是一个用于 [zcf-cli](https://github.com/abeet/zcf-cli.git) 的工程模板

``` bash
yarn add zcf-cli -g
zcf init elrond-childapp-vue my-project
cd my-project
cd client
yarn install
```

### 运行

- `server` 目录下是一个基于zcf的工程，运行java类 com.zving.Boot#main()  来启动后台服务
- `client` 目录下是一个vue工程，执行 `yarn run dev`  `yarn run start` 来启动前台

