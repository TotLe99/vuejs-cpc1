import './assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/fonts/themify-icons/themify-icons.css';
import '@vuepic/vue-datepicker/dist/main.css';

import App from './App.vue';
import router from './router';
import { createApp } from 'vue';
import storeConfigs from './store';
import VueDatePicker from '@vuepic/vue-datepicker';
import Paginate from 'vuejs-paginate';

const app = createApp(App);

app.use(router);
app.use(storeConfigs);
app.component('VueDatePicker', VueDatePicker);
app.component('PagiNate', Paginate);
app.mount('#app');
