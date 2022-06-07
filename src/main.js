import Vue from "vue";
import App from "./app";
import router from "./router";
import { VuejsDatatableFactory } from "vuejs-datatable";

Vue.config.productionTip = false;

Vue.use(VuejsDatatableFactory);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
