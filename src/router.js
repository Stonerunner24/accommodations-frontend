import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/Login.vue";
import RequestForm from "./views/RequestForm.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: "/login",
      name: "login",
      component: Login,
    },
    {
      path:"/request",
      name: "request",
      component: RequestForm,
    },
    
  ],
});

export default router;
