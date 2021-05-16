// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs.js'
import 'ant-design-vue/dist/antd.css'

Vue.use(Antd)
Vue.use(VueAxios, axios)

Vue.prototype.$qs = qs;
axios.defaults.baseURL = 'http://localhost:8080'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
