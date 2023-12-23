import { createRouter, createWebHistory } from 'vue-router';
import MaterialList from '../components/table/MaterialList';
import LoginComponent from '../components/login/LoginComponent';
import SideBar from '../components/layout/SideBar';
import NavBar from '../components/layout/NavBar';
import HomePage from '../components/layout/HomePage';

// const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));

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
    path: '/qlts',
    name: 'qlts',
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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAutenticated = JSON.parse(localStorage.getItem('inforLogin'));

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
