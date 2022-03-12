<template>
  <t-modal v-bind="$attrs" @modalsubmit="modalSubmit">
    <template #title> Delete menu </template>
    <template #body> Are you sure you want to delete this menu? </template>
  </t-modal>
</template>

<script>
import TModal from "@/components/TModal.vue";
import createRestaurant from "@/api/restaurant/createRestaurant";

export default {
  components: {
    TModal,
  },
  props: {
    restaurantId: {
      type: Number,
      required: true,
    },
  },
  emits: ["success", "error"],

  methods: {
    async modalSubmit() {
      try {
        const restaurant = await createRestaurant(this.restaurantName);
        this.$emit("success", restaurant);
      } catch (e) {
        this.$emit("error", e.message);
      }
    },
  },
};
</script>

<style></style>
