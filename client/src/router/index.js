import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Register from '../views/Register.vue';
import authenticateIncomingRequest from '../composables/authenticate';
import WentWrong from '../views/WentWrong.vue';
import UserDetails from '../views/users/UserDetails.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    async beforeEnter(to, from, next) {
      console.log(
        'Complete me.. If authenticated user tries to enter Home it should automatically redirect to Dashboard'
      );
      next();
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    async beforeEnter(to, from, next) {
      try {
        const request = await authenticateIncomingRequest();
        if (request.message === 'Authentication invalid') {
          router.push({ name: 'Home' });
        }
      } catch (e) {
        router.push({ name: 'WentWrong' });
      }
      next();
    }
  },
  {
    path: '/users/:id',
    name: 'UserDetails',
    props: true,
    component: UserDetails,
    async beforeEnter(to, from, next) {
      try {
        const request = await authenticateIncomingRequest();
        if (request.message === 'Authentication invalid') {
          router.push({ name: 'Home' });
        }
      } catch (e) {
        router.push({ name: 'WentWrong' });
      }
      next();
    }
  },
  {
    path: '/went-wrong',
    name: 'WentWrong',
    component: WentWrong
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
