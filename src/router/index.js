// import Vue from 'vue';
// import VueRouter from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import MaterialList from '../components/table/MaterialList';
import Table2Component from '../components/table/Table2Component';
import LoginComponent from '../components/login/LoginComponent';
import ItemComponent from '../components/ItemComponent';
import SideBar from '../components/layout/SideBar';
import NavBar from '../components/layout/NavBar';
import HomePage from '../components/layout/HomePage';

// Vue.use(VueRouter);
// const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));

const routes = [
  { path: '/login', component: LoginComponent, alias: '/'},
  { path: '/item', component: ItemComponent },

  {
    // will match anything starting with `/user-`
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
  {
    path: '/home',
    name: 'homepage',
    component: HomePage,
    children: [
      {
        path: '',
        components: {
          default: NavBar,
          sidebar: SideBar,
        },
      },
      {
        path: 'table1',
        name: 'table1',
        component: MaterialList,
      },
      {
        path: 'table2',
        name: 'table2',
        component: Table2Component,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
