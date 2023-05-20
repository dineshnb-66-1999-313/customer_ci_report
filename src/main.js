import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { VBModal } from 'bootstrap-vue';
import SmartTable from 'vuejs-smart-table';
import MopGeneration from './Content_render/MopGeneration';
import CustomerCIreport from './Content_render/Customer_CI_report';
import RFCGenerator from './Content_render/RfcGenerator';
import { BModal, BFormGroup, BFormCheckboxGroup, BFormCheckbox, BPagination, BFormSelect } from 'bootstrap-vue';
import { BTable } from 'bootstrap-vue';

Vue.component('b-modal', BModal);
Vue.component('b-table', BTable);
Vue.component('b-form-checkbox-group', BFormCheckboxGroup)
Vue.component('b-form-group', BFormGroup);
Vue.component('b-form-select', BFormSelect);
Vue.component('b-form-checkbox',BFormCheckbox)
Vue.component('b-pagination',BPagination)

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from './store';

Vue.directive('b-modal', VBModal);

Vue.use(VueRouter)

var beforeRoute = (next) => {
    if(store.state.selected_row.length < 1){
      next('/cireport');
    }
    else{
        next();
    }
    console.log(store.state.generateMOPtabledata)
}

const routes = [
  {
    path : "/",
    component: CustomerCIreport
  },
  {
    path : "/cireport",
    component: CustomerCIreport
  },
  {
    path: "/MopGeneration",
    component: MopGeneration,
    beforeEnter: (req, res, next) => {
      beforeRoute(next);
    },
  },
  {
    path: '/RfcGenerator',
    component: RFCGenerator,
    beforeEnter: (req, res, next) => {
      beforeRoute(next);
    },
  }

]

const router = new VueRouter({
  routes : routes, // or routes,
  mode: 'history'
})
Vue.use(SmartTable);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


