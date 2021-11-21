import { createRouter, createWebHashHistory } from "vue-router";
import Connexion from "../views/Authentification/Connexion.vue";
import Home from "../views/Home.vue";
import Feed from "../views/Feed.vue";
import Users from "../views/Users.vue";
import User from "../components/User.vue";
import UpdateProfile from "../views/UpdateProfile.vue";

const routes = [
  {
    path: "/",
    name: "Connexion",
    component: Connexion,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/feed",
    name: "Feed",
    component: Feed,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/users/:id",
    name: "User",
    component: User
  },
  {
    path: "/updateProfile",
    name: "UpdateProfile",
    component: UpdateProfile,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {x: 0, y: 0}
}
  
});



export default router;
