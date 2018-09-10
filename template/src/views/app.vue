<template>
  <div>
    <div class='sidebar'>
      <div class='menus-container' id='menus-container'>
        <ul class='menu level1'>
          <li v-for='menu in menus' :key="menu.path" v-if="menu.meta && menu.meta.title" class="menu-item level1 expanded" :class="{haschilds: menu.children && menu.children.length}">

            <router-link :to="menu.path" :class="{haschilds: menu.children && menu.children.length}">
              <span class="menu-title">\{{menu.meta.title}}</span>
            </router-link>

            <ul v-if='menu.children && menu.children.length' class="menu level2">
              <li v-for="submenu in menu.children" :key='submenu.path' v-if="submenu.meta && submenu.meta.title" class="menu-item level2" :class="{active: routePath === submenu.path}">

                <router-link :to="submenu.path">
                  <span class="menu-title">\{{submenu.meta.title}}</span>
                </router-link>

              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div id='domain' class='domain'>
      <a class='logo'>\{{SERVICENAME}}</a>
    </div>
    <div id='services-container' class='services-container'>

      <div :id="SERVICEID" :class="SERVICEID">
        <h4>这儿是一个子应用，使用Vue编写。</h4>
        <router-view :key="$route.fullPath"></router-view>
      </div>

    </div>
  </div>
</template>
<script>
import { SERVICEID, SERVICENAME } from '../config.js'
import routes from '../router/routes.js'

// 以下向window添加全局变量，如果有正确配置ESLint，应该会显示ESLint警告
// window.asdf = 123
// window['asdf'] = 123
// 以下添加cookie，如果有正确配置ESLint，应该会显示ESLint警告
// document.cookie = 'asdf=123'

const menus = JSON.parse(JSON.stringify(routes))
for (let i = menus.length - 1; i >= 0; i--) {
  let menu = menus[i]
  if (!menu.meta || !menu.meta.title) {
    menus.splice(i, 1)
  } else if (menu.children && menu.children.length) {
    for (let j = menu.children.length - 1; j >= 0; j--) {
      let submenu = menu.children[j]
      if (!submenu.meta || !submenu.meta.title) {
        menu.children.splice(j, 1)
      }
    }
  }
}
export default {
  data () {
    return {
      SERVICEID,
      SERVICENAME,
      menus
    }
  }
}
</script>
