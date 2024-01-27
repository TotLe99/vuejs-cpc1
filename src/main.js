import './assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/fonts/themify-icons/themify-icons.css';
import 'element-plus/dist/index.css';

import App from './App.vue';
import router from './router';
import { createApp } from 'vue';
import storeConfigs from './store';
import ElementPlus from 'element-plus';
import _ from 'lodash';
import QRCodeVue3 from 'qrcode-vue3';

const app = createApp(App);

app.use(router);
app.use(storeConfigs);
app.use(ElementPlus);
app.use(QRCodeVue3);
app.config.globalProperties._ = _;

app.mount('#app');
