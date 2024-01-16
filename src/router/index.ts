import {createRouter, createWebHistory} from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt-token');
  const hashToken = '2af9b1ba42dc5eb01743e6b3759b6e4b'

  if (to.meta?.requiresAuth && token !== hashToken) {
    next({name: 'GuardGame'}); // Перенаправление на страницу входа
  } else {
    next(); // В противном случае продолжить как обычно
  }
});

export default router;
