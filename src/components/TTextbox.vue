<template>
  <div class="relative z-0 w-full mb-5 mt-1">
    <textarea
      class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200 bg-white"
      :class="{ 'resize-none': !resize }"
      :name="props.name"
      :value="props.modelValue"
      placeholder=" "
      @input="updateValue($event.target.value)"
    />
    <label for="name" class="absolute duration-300 top-3 z-1 origin-0 text-gray-500">{{
      props.label
    }}</label>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  resize: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (value) => {
  emit("update:modelValue", value);
};
</script>

<style scoped>
.-z-1 {
  z-index: -1;
}

.origin-0 {
  transform-origin: 0%;
}

textarea:focus ~ label,
textarea:not(:placeholder-shown) ~ label,
textarea:focus ~ label,
textarea:not(:placeholder-shown) ~ label {
  /* @apply transform; scale-75; -translate-y-6; */
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  --tw-scale-x: 0.75;
  --tw-scale-y: 0.75;
  --tw-translate-y: -1.5rem;
  z-index: 50;
}

textarea:focus ~ label {
  /* @apply text-black; left-0; */
  --tw-text-opacity: 1;
  color: rgba(0, 0, 0, var(--tw-text-opacity));
  left: 0px;
  z-index: 50;
}
</style>
