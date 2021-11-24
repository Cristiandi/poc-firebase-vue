import { createRouter, createWebHistory } from "vue-router";

import { getAuth } from "firebase/auth";

import firebaseApp from "../firebase";

// views
import LoggedOut from "../views/LoggedOut.vue";
import SendOTP from "../views/SendOTP.vue";
import VerifyOTP from "../views/VerifyOTP.vue";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "LoggedOut",
    component: LoggedOut,
  },
  {
    path: "/send-otp",
    name: "SendOTP",
    component: SendOTP,
  },
  {
    path: "/verify-otp",
    name: "VerifyOTP",
    component: VerifyOTP,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const auth = getAuth(firebaseApp);

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  // console.log('requiresAuth', requiresAuth);

  // console.log('auth.currentUser', auth.currentUser);

  if (requiresAuth && !auth.currentUser) {
    return next("/");
  } else if (!requiresAuth && auth.currentUser) {
    return next("/home");
  } else {
    return next();
  }
});

export default router;
