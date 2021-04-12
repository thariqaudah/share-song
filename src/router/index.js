import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/auth/Login.vue';
import Signup from '@/views/auth/Signup.vue';
import CreatePlaylist from '@/views/playlist/CreatePlaylist.vue';
import PlaylistDetails from '@/views/playlist/PlaylistDetails.vue';
import getUser from '@/composables/getUser';

const { user } = getUser();

const requireAuth = (to, from, next) => {
  if (user.value) {
    next();
  } else {
    next({ name: 'Login' });
  }
};

const requireNoAuth = (to, from, next) => {
  if (!user.value) {
    next();
  } else {
    next({ name: 'Home' });
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth,
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: Login,
    beforeEnter: requireNoAuth,
  },
  {
    path: '/auth/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: requireNoAuth,
  },
  {
    path: '/playlist/create',
    name: 'CreatePlaylist',
    component: CreatePlaylist,
    beforeEnter: requireAuth,
  },
  {
    path: '/playlist/:id/details',
    name: 'PlaylistDetails',
    component: PlaylistDetails,
    beforeEnter: requireAuth,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
