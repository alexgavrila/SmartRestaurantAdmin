<template>
  <transition-group
    name="alert"
    tag="t-alert"
    class="bg-transparent w-full h-full fixed top-0 left-0 pt-10 pointer-events-none flex items-center flex-col z-50"
  >
    <t-alert
      v-for="(alert, key) in alerts"
      :key="key"
      :message="alert.message"
      :type="alert.type"
      :title="alert.title"
    />
  </transition-group>
</template>

<script>
import TAlert from "./TAlert.vue";

export default {
  components: {
    TAlert,
  },
  computed: {
    alerts() {
      return this.$store.state.alerts;
    },
  },
};
</script>

<style scoped>
.alert-enter-active,
.alert-leave-active {
  transition: all 1s ease;
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
