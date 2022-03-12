import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/faLibrary";

const app = createApp(App);

let intervalObj;
app.config.globalProperties.$alert = async ({ message, type, title, timeout = 3000 }) => {
  store.commit("addAlert", { message, type, title, timeout });
  if (!intervalObj) {
    intervalObj = setInterval(() => {
      const now = Date.now();
      const alerts = Object.entries(store.state.alerts);

      if (!alerts.length) {
        intervalObj = clearInterval(intervalObj);
      }

      for (const [key, value] of Object.entries(store.state.alerts)) {
        if (value.timeout + parseInt(key) <= now) {
          store.commit("removeAlert", key);
        }
      }
    }, 100);
  }
};

app.directive("loading", {
  updated(el, { value }) {
    if (value) {
      const loadingDiv = document.createElement("div");
      loadingDiv.classList =
        "loading flex items-center justify-center space-x-2 absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 z-40";
      const ball = document.createElement("div");
      ball.classList =
        "spinner-border animate-bounce inline-block w-8 h-8 border-4 rounded-full text-blue-600";
      loadingDiv.appendChild(ball);
      loadingDiv.appendChild(ball.cloneNode(true));
      loadingDiv.appendChild(ball.cloneNode(true));
      el.firstChild.appendChild(loadingDiv);
    } else {
      if (el.firstChild.getElementsByClassName("loading")[0]) {
        el.firstChild.getElementsByClassName("loading")[0].remove();
      }
    }
  },
});

app.component("FaIcon", FontAwesomeIcon);
app.use(store).use(router).mount("#app");
