// TODO: Add Icons
<template>
  <button
    class="text-white font-bold rounded mx-1"
    :type="props.type"
    :class="{
      'px-4 py-2': size == 'normal',
      'px-2 py-0': size == 'small',
      'bg-blue-500 hover:bg-blue-700': color == 'blue',
      'bg-yellow-500 hover:bg-yellow-700': color == 'yellow',
      'bg-green-500 hover:bg-green-700': color == 'green',
      'bg-red-500 hover:bg-red-700': color == 'red',
    }"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  size: {
    type: String,
    default: "normal",
  },
  color: {
    type: String,
    default: "blue",
  },
});
</script>

<style></style>
