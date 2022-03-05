import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Register from '../views/Register.vue';
import authenticateIncomingRequest from '../components/authenticate';
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
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    async beforeEnter(to, from, next) {
      const request = await authenticateIncomingRequest();
      if (request.message === 'Authentication invalid') {
        router.push({ name: 'Home' });
      }
      next();
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
