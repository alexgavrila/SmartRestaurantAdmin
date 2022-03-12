<template>
  <div class="flex w-3/4 lg:w-1/3 z-50 shadow-2xl bg-white h-14 relative opacity-100 mb-4">
    <div
      class="h-14 w-16 flex items-center justify-center"
      :class="{
        'bg-blue-500': type == 'info',
        'bg-yellow-500': type == 'warning',
        'bg-green-500': type == 'success',
        'bg-red-500': type == 'error',
      }"
    >
      <fa-icon class="fa-2x text-white" icon="exclamation-circle" />
    </div>
    <div class="ml-2 w-full flex items-center">
      <span
        class="font-bold mr-1"
        :class="{
          'text-blue-500': type == 'info',
          'text-yellow-500': type == 'warning',
          'text-green-500': type == 'success',
          'text-red-500': type == 'error',
        }"
        >{{ titleComputed }}</span
      >
      {{ message }}
    </div>
    <div v-if="closeable" class="mr-2 mt-2 text-gray-400 cursor-pointer">
      <fa-icon icon="times" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  type: {
    type: String,
    default: "success",
    validator: (value) => {
      return ["success", "info", "warning", "error"].includes(value);
    },
  },
  title: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "Some message!",
  },
  closeable: {
    type: Boolean,
    default: false,
  },
});

const titleComputed = computed(() => props.title || props.type.toUpperCase() + "!");
</script>

<style scoped></style>
