import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {store} from "./vuex/store";
import {router} from './router/router'

Vue.config.productionTip = false

Vue.use(store)
Vue.use(router)

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
