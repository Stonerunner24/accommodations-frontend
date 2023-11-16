import { createRouter, createWebHistory } from "vue-router";

// Import views
import Login from "./views/Login.vue";
//import RequestForm from "./views/RequestForm.vue";

/*import TutorialsList from "./views/TutorialsList.vue";
import EditTutorial from "./views/EditTutorial.vue";
import AddTutorial from "./views/AddTutorial.vue";
import ViewTutorial from "./views/ViewTutorial.vue";
import AddLesson from "./views/AddLesson.vue";
import EditLesson from "./views/EditLesson.vue"; */
import AdminHome from "./views/AdminHome.vue";
import StudentHome from "./views/StudentHome.vue";
import AdminAdd from "./views/AdminAdd.vue"
import AdminAccomManage from "./views/AdminAccomManage.vue"
import AdminStudentAccom from "./views/AdminStudentAccom.vue"

// Import layouts
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
        {
          // :id is the id of the request which is being added to 
          path: 'adminAdd/:id',
          name: 'adminAdd',
          component: AdminAdd,
          // props: {route} => {{ request: route.request.requestId}}
        },
        {
          // :id is the id of the request which is being added to 
          path: 'adminAccomManage/',
          name: 'adminAccomManage',
          component: AdminAccomManage,
          // props: {route} => {{ request: route.request.requestId}}
        },
        {
          path: 'adminStudentAccom/',
          name: 'adminStudentAccom',
          component: AdminStudentAccom,
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
    {
      path: "/StudentHome/:studentId",
      name: "StudentHome",
      component: StudentHome,
      props: true,
    },
  ],
});

export default router;
