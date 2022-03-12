<template>
  <div
    class="bg-gray-900 h-14 left-0 top-0 fixed w-full flex justify-end items-center text-gray-200 pr-5 z-50"
  >
    <div class="flex-1 px-3"><span>Smart</span> <b class="font-black">Restaurant</b></div>

    <router-link class="pl-5" to="/">Home </router-link>
    <router-link class="pl-5" to="/about">About </router-link>
    <template v-if="!user.isLoggedIn">
      <router-link class="pl-5" to="/login">Login </router-link>
      <router-link class="pl-5" to="/register">Register</router-link>
    </template>
    <template v-else>
      <a class="pl-5 cursor-pointer" @click="onLogout">Logout</a>
    </template>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";
import fetchApi from "@/utils/fetchApi";

const store = useStore();
const router = useRouter();

const user = computed(() => store.state.user);

const onLogout = async () => {
  const res = await fetchApi({
    url: "/auth/logout",
    method: "GET",
  });

  if (res.status === 200) {
    store.dispatch("setUser", {
      userData: {},
      isLoggedIn: false,
    });

    router.push("/");
  }
};
</script>

<style></style>
