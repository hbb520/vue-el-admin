// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import ElementUI from 'element-ui'
import '@/styles/element-variables.scss'
import '../static/font-awesome/css/font-awesome.min.css'
import '@/styles/index.scss' // global css
//moment 将成为全局 this.$moment(xxx).format("YYYY-MM-DD HH:mm:ss")
import moment from 'moment';
Object.defineProperty(Vue.prototype, '$moment', { value: moment });


// import '@/permission' // permission control
//size   ---  全局大小
Vue.use(ElementUI, {size: 'medium'})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
