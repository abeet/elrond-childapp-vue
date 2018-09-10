/* eslint-disable elrond-childapp-bound/no-write-cookie */
function extend () {
  var i = 0
  var result = {}
  for (; i < arguments.length; i++) {
    var attributes = arguments[i]
    for (var key in attributes) {
      result[key] = attributes[key]
    }
  }
  return result
}

var docCookies = {
  getItem: function (sKey) {
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'),
          '$1'
        )
      ) || null
    )
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
      return false
    }
    var sExpires = ''
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd
          break
        case String:
          sExpires = '; expires=' + vEnd
          break
        case Date:
          sExpires = '; expires=' + vEnd.toUTCString()
          break
      }
    }
    document.cookie =
      encodeURIComponent(sKey) +
      '=' +
      encodeURIComponent(sValue) +
      sExpires +
      (sDomain ? '; domain=' + sDomain : '') +
      (sPath ? '; path=' + sPath : '') +
      (bSecure ? '; secure' : '')
    return true
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) {
      return false
    }
    document.cookie =
      encodeURIComponent(sKey) +
      '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
      (sDomain ? '; domain=' + sDomain : '') +
      (sPath ? '; path=' + sPath : '')
    return true
  },
  hasItem: function (sKey) {
    return new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') + '\\s*\\=').test(document.cookie)
  }
}

let SERVICEID // 子应用id

const Cookies = { defaults: {} }

Cookies.set = function (key, value, options) {
  if (!SERVICEID) {
    throw new Error('使用Cookies.get方法前需先调用Cookies.setServiceId设置子应用id')
  }
  if (value.length && value.length > 2000) {
    // 不接受长度超过2000个字符的cookie
    throw new Error('不写入cookie中的数据长度不能超过2000个字符')
  }
  options = extend(
    {
      path: '/'
    },
    Cookies.defaults,
    options
  )

  if (options.expires) {
    if (options.expires.constructor === Number) {
      options.expires = options.expires === Infinity ? 253402300799000 : Date.now() + options.expires * (1000 * 60 * 60 * 24)
    } else if (options.expires.constructor === Date) {
      options.expires = options.expires.getTime()
    }
  }
  options.value = String(value)

  var name = encodeURIComponent(key)
  let cookiesInStorage = window.localStorage.getItem('cookies-' + SERVICEID) || '{}'
  cookiesInStorage = JSON.parse(cookiesInStorage)
  cookiesInStorage[name] = options
  window.localStorage.setItem('cookies-' + SERVICEID, JSON.stringify(cookiesInStorage))
  // TODO: 在这儿向后台同步存在localStorage里的cookie
  const result = {}
  result[name] = options
  return result
}

Cookies.get = function (key) {
  var val
  let cookiesInStorage = window.localStorage.getItem('cookies-' + SERVICEID) || '{}'
  cookiesInStorage = JSON.parse(cookiesInStorage)
  var name = encodeURIComponent(key)
  if (cookiesInStorage[name]) {
    var cookie = cookiesInStorage[name]
    var expires = cookie.expires
    if (!expires || expires > Date.now()) {
      val = cookie.value
    } else if (expires && expires < Date.now()) {
      delete cookiesInStorage[name]
      window.localStorage.setItem('cookies-' + SERVICEID, JSON.stringify(cookiesInStorage))
    }
  }
  if (val) {
    return val
  } else {
    // 如果没有找到对应的值，到cookie里再找一下，适用于后台写了cookie，前台马上从cookie里读取的情况
    let val = docCookies.getItem(key)
    if (val) {
      Cookies.set(key, val)
      docCookies.removeItem(key)
      return val
    }
  }
}

Cookies.remove = function (key, options) {
  options = options || {}
  let cookiesInStorage = window.localStorage.getItem('cookies-' + SERVICEID) || '{}'
  cookiesInStorage = JSON.parse(cookiesInStorage)
  var name = encodeURIComponent(key)
  if (cookiesInStorage[name]) {
    let noMatch = false
    for (let o in options) {
      if (options[o] !== cookiesInStorage[name][o]) {
        noMatch = true
        break
      }
    }
    if (!noMatch) {
      delete cookiesInStorage[name]
    }
  }
  window.localStorage.setItem('cookies-' + SERVICEID, JSON.stringify(cookiesInStorage))

  let val = docCookies.getItem(key)
  // 如果cookie里存在同名的，也删除
  if (val) {
    docCookies.removeItem(key, options.path, options.domain)
    return val
  }
}

Cookies.setServiceId = function (serviceId) {
  SERVICEID = serviceId.replace(/^\//, '')
}
Cookies.getServiceId = function () {
  return SERVICEID
}

export default Cookies
