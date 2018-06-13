// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import loginShow from './lib/loginShow';

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vueQuillEditor from 'vue-quill-editor'

Vue.config.productionTip = false
Vue.use(iView);

Vue.use(Element) // use element-ui library
Vue.use(vueQuillEditor) // use vue quill editor

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
