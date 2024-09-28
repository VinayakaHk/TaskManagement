import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/authorizationViews/RegisterView.vue'
import LoginView from '@/views/authorizationViews/LoginView.vue'
const routes = [
  {
    path: "/auth/login",
    component: LoginView,
  },
  {
    path: "/auth/register",
    component: RegisterView

  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: "Task Management Application",
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Task Management Application";
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (
    process.env.VUE_APP_OPEN_ROUTES &&
    process.env.VUE_APP_OPEN_ROUTES == "enable"
  )
    next();
  else
    try {
      const status = localStorage.getItem("auth-token");

      if (requiresAuth && !status) next("/auth/login");
      else next();
    } catch (error) {
      console.error("ROUTER_ERROR", error);
      next("/auth/login");
    }
});



export default router
