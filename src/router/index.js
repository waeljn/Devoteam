import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login";
import Home from "../views/home";
import Users from "../views/users";
import NewUser from "../views/users/new";
import UserDetails from "../views/users/[id]";
import EditUser from "../views/users/[id]/edit";
import Projects from "../views/projects";
import NewProject from "../views/projects/new";
import ProjectDetails from "../views/projects/[id]";
import ProjectTodo from "../views/projects/[id]/todos";
import NewProjectTodo from "../views/projects/[id]/todos/new";
import EditProject from "../views/projects/[id]/edit";
import Profile from "../views/profile";
import ProfileSecurity from "../views/profile/security";
import Todos from "../views/todos"
import NewTodos from "../views/todos/new";
import TodosDetails from "../views/todos/[id]";
import EditTodos from "../views/todos/[id]/edit";
import Contact from "../views/contact" ;
import Comments from "../views/comments" ;
import Workspace from "../views/workspace" ;

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/users",
    name: "users",
    component: Users,
  },
  {
    path: "/users/new",
    name: "new-user",
    component: NewUser,
  },
  {
    path: "/users/:id",
    name: "user-details",
    component: UserDetails,
  },
  {
    path: "/users/:id/edit",
    name: "edit-user",
    component: EditUser,
  },
  {
    path: "/projects",
    name: "projects",
    component: Projects,
  },
  {
    path: "/projects/new",
    name: "new-project",
    component: NewProject,
  },
  {
    path: "/projects/:id",
    name: "project-details",
    component: ProjectDetails,
  },
  {
    path: "/projects/:id/todos",
    name: "project-todo",
    component: ProjectTodo,
  },
  {
    path: "/projects/:id/todos/new",
    name: "new-project-todo",
    component: NewProjectTodo,
  },
  {
    path: "/projects/:id/edit",
    name: "edit-project",
    component: EditProject,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/profile/security",
    name: "profile-security",
    component: ProfileSecurity,
  },
  {
    path: "/todos",
    name: "todos",
    component: Todos,
  },
  {
    path: "/todos/new",
    name: "new-todos",
    component: NewTodos,
  },
  {
    path: "/todos/:id",
    name: "todos-details",
    component: TodosDetails,
  },
  {
    path: "/todos/:id/edit",
    name: "edit-todos",
    component: EditTodos,
  },
 
  {
    path: "/contact",
    name: "contact",
    component: Contact,
  },
  {
    path: "/comments",
    name: "comments",
    component: Comments,
  },
  {
    path: "/workspace",
    name: "workspace",
    component: Workspace,
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   const role = localStorage.getItem("role");
//   if (to.name !== "users" && role === "ROLE_MANAGER") {
//     next({ name: "users" });
//   } else {
//     next({ name: "login" });
//   }
// });

router.beforeEach(async (to, from, next) => {
  if (to.name !== "profile" && !localStorage.getItem("profile")) {
    next({ name: "profile" });
  } else {
    next();
  }
});
export default router;
