import { createRouter, createWebHistory } from "vue-router";

// Import views
import Login from "./views/Login.vue";
import RequestForm from "./views/RequestForm.vue";
import AdminHome from "./views/AdminHome.vue";
import StudentHome from "./views/StudentHome.vue";

// Import layouts
import SimpleLayout from "./layouts/SimpleLayout.vue";
import AdminLayout from "./layouts/AdminLayout.vue";
import StudentLayout from "./layouts/StudentLayout.vue";

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
      // Student is the parent path to all student views and routes
      // It contains the student header and sidebar in StudentLayout
      path: "/student",
      component: StudentLayout,
      // All student routes are added as children of /student
      children: [
        { 
          path: '', 
          name: 'studentHome', 
          component: StudentHome 
        },
        {
          path: "makeRequest",
          name: "makeRequest",
          component: RequestForm
        },
      ],
    },
    {
      path: "/admin",
      component: AdminLayout,
      children: [
        { 
          path: '', 
          name: "adminHome", 
          component: AdminHome
        },
      ],
    },
    
    // Leaving these routes for now as an example
    /*{
      path: "/edit/:id",
      name: "edit",
      component: EditTutorial,
      props: true,
    },
    {
      path: "/add",
      name: "add",
      component: AddTutorial,
    },
    {
      path: "/view/:id",
      name: "view",
      component: ViewTutorial,
      props: true,
    },
    {
      path: "/addLesson/:tutorialId",
      name: "addLesson",
      component: AddLesson,
      props: true,
    },
    {
      path: "/editLesson/:tutorialId/:lessonId",
      name: "editLesson",
      component: EditLesson,
      props: true,
    },*/
  ],
});

export default router;
