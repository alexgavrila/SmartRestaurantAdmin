<template>
  <Sidebar />
  <navbar />
  <t-alert-overlay />
  <div id="page-wrapper" class="px-10 py-5">
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import { onMounted } from "vue";
import { useStore } from "vuex";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import TAlertOverlay from "@/components/TAlert/TAlertOverlay";
import fetchApi from "@/utils/fetchApi";

export default {
  name: "App",
  components: {
    Sidebar,
    Navbar,
    TAlertOverlay,
  },
  setup() {
    const store = useStore();

    onMounted(async () => {
      const res = await fetchApi({
        url: "/user/me",
        method: "GET",
      });

      if (res.status === 200) {
        const body = await res.json();

        store.dispatch("setUser", {
          userData: body,
          isLoggedIn: true,
        });
      }
    });
  },
};
</script>

<style></style>
