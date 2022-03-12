<template>
  <transition name="modal-fade">
    <div
      class="p-7 flex justify-center items-center fixed left-0 top-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 transition-opacity duration-300"
      @click.self="close"
    >
      <div class="bg-white flex rounded-lg w-1/3 relative">
        <div class="flex w-full flex-col items-start">
          <div class="p-7 flex items-center w-full">
            <div class="text-gray-900 font-bold text-lg">
              <slot name="title">Title</slot>
            </div>
            <div class="ml-auto fill-current text-gray-700 w-5 h-5 cursor-pointer" @click="close">
              <fa-icon icon="times" />
            </div>
          </div>

          <div class="px-7 overflow-x-hidden overflow-y-auto w-full" style="max-height: 40vh">
            <slot name="body"></slot>
          </div>

          <div class="p-7 flex justify-end items-center w-full">
            <slot name="footer">
              <button
                type="button"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3"
                @click="submit"
              >
                Ok
              </button>
              <button
                type="button"
                class="bg-transparent hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                @click="close"
              >
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const emit = defineEmits(["modalclose", "modalsubmit"]);

const close = () => {
  emit("modalclose");
};

const submit = () => {
  emit("modalsubmit");
};
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.1s cubic-bezier();
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
