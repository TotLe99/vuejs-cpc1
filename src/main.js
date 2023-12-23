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

const app = createApp(App);

app.use(router);
app.use(storeConfigs);
app.use(ElementPlus);
app.mount('#app');
