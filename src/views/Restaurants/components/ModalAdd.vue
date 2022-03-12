<template>
  <t-modal v-loading="loading" v-bind="$attrs" @modalsubmit="modalSubmit">
    <template #title> Add restaurant </template>
    <template #body>
      <t-input v-model="restaurantName" type="text" label="Name" />
    </template>
  </t-modal>
</template>

<script>
import TModal from "@/components/TModal.vue";
import TInput from "@/components/TInput.vue";
import createRestaurant from "@/api/restaurant/createRestaurant";

export default {
  components: {
    TModal,
    TInput,
  },
  emits: ["success", "error"],
  data() {
    return {
      restaurantName: "",
      loading: false,
    };
  },
  methods: {
    async modalSubmit() {
      this.loading = true;
      try {
        const restaurant = await createRestaurant(this.restaurantName);
        this.$emit("success", restaurant);
      } catch (e) {
        this.$emit("error", e.message);
      }
      this.loading = false;
    },
  },
};
</script>

<style></style>
