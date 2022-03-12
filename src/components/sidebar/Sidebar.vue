<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

defineProps({
  menu: {
    type: Array,
    default: () => [],
  },
});
const store = useStore();
const isFullScreen = computed(() => store.state.isFullScreen);
const isMenuExpandedMobile = computed(() => store.state.isMenuExpandedMobile);
const menuToggle = () => {
  store.dispatch("toggleMenuState", false);
};
</script>

<template>
  <aside
    class="w-60 fixed top-0 z-40 h-screen bg-gray-800 transition-position lg:left-0 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-600 scrollbar-track-gray-900 dark:border-r dark:border-gray-800 dark:scrollbar-track-gray-800 dark:bg-gray-900 overflow-auto"
    :class="[isMenuExpandedMobile ? 'left-0' : '-left-60']"
    @show="!isFullScreen"
  >
    <div class="text-white mt-20">
      <router-link class="pl-5" to="/restaurants">Restaurants</router-link>
    </div>
  </aside>
  <div
    class="flex fixed items-center justify-center h-12 w-8 top-15 lg:hidden rounded-r-xl bg-gray-500 text-white cursor-pointer z-50"
    :class="[isMenuExpandedMobile ? 'left-60' : 'left-0']"
    @click="menuToggle"
  >
    <div class="">
      <template v-if="isMenuExpandedMobile"> - </template>
      <template v-else>+</template>
    </div>
  </div>
</template>

<style scoped>
#sidebar {
  margin: 0;
  position: fixed;
  height: 100vh;
  width: 15vw;
  background-color: rgb(230, 230, 230);
}

#sidebar #header {
  margin-top: 1em;
  font-weight: 900;
  font-size: 1.5em;
}

#sidebar #list {
  margin-top: 1em;
  font-weight: bold;
  font-size: 1em;
}
</style>
