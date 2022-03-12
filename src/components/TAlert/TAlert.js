import TAlert from "./TAlert.vue";

import { createVNode, render } from "vue";
const body = document.body;
const root = document.createElement("div");
body.appendChild(root);
root.className = "custom-root";

export default {
  install(app) {
    return () => {
      let div = document.createElement("div");
      root.appendChild(div);
      let vm = createVNode(TAlert, {}, {});
      vm.appContext = app._context;
      render(vm, div);
      setTimeout(() => {
        render(null, div);

        div.parentNode.removeChild(div);
      }, 10000);
    };
  },
};
