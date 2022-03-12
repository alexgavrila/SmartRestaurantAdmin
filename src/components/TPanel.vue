<template>
  <div class="my-4 p-4 bg-white shadow-md relative z-">
    <div v-if="title" class="mb-6 border-b-2">
      <span class="text-gray-900 font-light text-2xl">{{ title }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>
