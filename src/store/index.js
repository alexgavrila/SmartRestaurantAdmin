import { createStore } from "vuex";

export default createStore({
  state: {
    // userdata
    user: {
      userData: {},
      isLoggedIn: false,
    },

    // sidebar data
    isFullScreen: false,
    isMenuExpandedMobile: false,

    alerts: {},

    breadcrumbs: {
      restaurant: {},
      menu: {},
      category: {},
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    setIsMenuExpandedMobile(state, value) {
      state.isMenuExpandedMobile = value;
    },

    addAlert(state, alert) {
      state.alerts[Date.now()] = alert;
    },

    removeAlert(state, key) {
      delete state.alerts[key];
    },

    setBreadCrumbItem(state, { key, value }) {
      state.breadcrumbs[key] = value;
    },
  },
  actions: {
    setUser(context, user) {
      context.commit("setUser", user);
    },

    toggleMenuState(context) {
      context.commit("setIsMenuExpandedMobile", !context.state.isMenuExpandedMobile);
    },

    setBreadCrumbItem(context, payload) {
      context.commit("setBreadCrumbItem", payload);
    },
    addAlert(context, payload) {
      context.commit("addAlert", payload);
    },
    removeAlert(context, key) {
      context.commit("removeAlert", key);
    },
  },
  modules: {},
});
