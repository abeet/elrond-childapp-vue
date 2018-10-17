let SERVICEID // 子应用id

function getKey(key) {
    if (!SERVICEID) {
        throw new Error('LocalStorage方法前需先调用LocalStorage.setServiceId设置子应用id')
    }
    return `${SERVICEID}.${key}`
}

const LocalStorage = {};
LocalStorage.setItem = function (key, value) {
    window.localStorage.setItem(getKey(key), value)
}

LocalStorage.getItem = function (key) {
    return window.localStorage.getItem(getKey(key));
}

LocalStorage.removeItem = function (key) {
    window.localStorage.removeItem(getKey(key));
}

LocalStorage.setServiceId = function (serviceId) {
    SERVICEID = serviceId.replace(/^\//, '')
}
LocalStorage.getServiceId = function () {
    return SERVICEID
}

export default LocalStorage;