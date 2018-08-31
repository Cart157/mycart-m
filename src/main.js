// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Locale } from 'vant'
import i18n from 'vant/es/mixins/i18n'

Vue.mixin(i18n)
Vue.config.productionTip = false

// 添加页面组件的i18n到全局
for (let idx in router.options.routes) {
  const { i18n } = router.options.routes[idx].component
  if (i18n) {
    Locale.add(i18n)
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
