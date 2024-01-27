import { createRouter, createWebHistory } from 'vue-router';
import MaterialList from '../components/material/MaterialList';
import TemList from '../components/tem/TemList';
import LoginComponent from '../components/login/LoginComponent';
import SideBar from '../components/layout/SideBar';
import NavBar from '../components/layout/NavBar';
import HomePage from '../components/layout/HomePage';
import LocationMaterial from '../components/locationMaterial/LocationMaterial';
import ExportList from '../components/retailExport/ExportList';
import CreateVoucher from '../components/internalInventory/CreateVoucher';
import InventoryInternalList from '../components/internalInventory/InventoryInternalList';

const isAutenticated = JSON.parse(localStorage.getItem('inforLogin'));

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginComponent,
    alias: '/',
    props: (route) => ({ redirect: route.query.redirect }),
  },

  {
    // will match anything starting with `/user-`
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
  {
    path: '/kpl',
    name: 'kpl',
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
        path: 'lo-nhap',
        name: 'lo-nhap',
        component: MaterialList,
      },
      {
        path: 'tem',
        name: 'tem',
        component: TemList,
      },
      {
        path: 'location',
        name: 'location',
        component: LocationMaterial,
      },
      {
        path: 'retailExport',
        name: 'retailExport',
        component: ExportList,
      },
      {
        path: 'createVoucher',
        name: 'createVoucher',
        component: CreateVoucher,
      },
      {
        path: 'inventoryInternalList',
        name: 'inventoryInternalList',
        component: InventoryInternalList,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && isAutenticated == null) {
    next({
      name: 'login',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
