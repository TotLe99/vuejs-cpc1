import App from './App.vue';
import router from './router';
import { createApp } from 'vue';
import './assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/fonts/themify-icons/themify-icons.css';
import storeConfigs from './store';

const app = createApp(App);

app.use(router);
app.use(storeConfigs);
app.mount('#app');
