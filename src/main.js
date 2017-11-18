// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import store from './store'
import router from './router'

Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(ElementUI)
window.FUCK = {};
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
