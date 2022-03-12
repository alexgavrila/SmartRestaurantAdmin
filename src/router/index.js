import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store/index";
import fetchApi from "../utils/fetchApi";

import Restaurants from "../views/Restaurants/Restaurants.vue";
import RestaurantDetails from "../views/RestaurantDetails/RestaurantDetails.vue";
import MenuDetails from "../views/MenuDetails/MenuDetails.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: Home,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/restaurants",
    name: "Restaurants",
    component: Restaurants,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/restaurants/:restaurantId",
    name: "RestaurantDetails",
    component: RestaurantDetails,
    props: true,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/restaurants/:restaurantId/:menuId",
    name: "MenuDetails",
    component: MenuDetails,
    props: true,
    meta: {
      requireLogin: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requireLogin) {
    const res = await fetchApi({
      url: "/user/me",
      method: "GET",
    });

    if (res.status != 200) {
      store.dispatch("setUser", {
        userData: {},
        isLoggedIn: false,
      });
    } else {
      const body = res.json();
      store.dispatch("setUser", {
        userdata: body.userData,
        isLoggedIn: true,
      });
    }
  }

  next();
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireLogin === true && store.state.user.isLoggedIn === false) {
    next("/login");
  } else {
    next();
  }
});

export default router;
