import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/Home.vue';
import ProfileEdit from './components/ProfileEdit.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/profile-edit',
    name: 'ProfileEdit',
    component: ProfileEdit,
    props: () => ({
      posts: JSON.parse(localStorage.getItem('posts') || '[]'),
      currentUser: localStorage.getItem('currentUser') || ''
    })
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
