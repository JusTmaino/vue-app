// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'

Vue.config.productionTip = false

require ('./assets/css/vendors/perfect-scrollbar.min.css')
require ('./assets/css/app.css')
require ('./assets/css/vendors/sweetalert2.min.css')

Vue.use(VueFire)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
