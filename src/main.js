// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
axios.defaults.withCredentials = true
    // axios.defaults.baseURL = 'http://cdmptest:8080/upesn'
Vue.prototype.axios = axios

// 正是环境
// global.API = "http://cdmp.yonyou.com/upesn"
// 测试环境
global.API = "http://cdmptest:8080/upesn/front"
    // 本地环境
    //global.API = "http://localhost:8080/upesn"
    // 图片地址
global.BashImgUrl = "http://cdmptest:8080/upesn/"
global.code = ''
    // import 'mint-ui/lib/style.css'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})