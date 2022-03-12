<template>
  <t-modal v-loading="loading" v-bind="$attrs" @modalsubmit="modalSubmit">
    <template #title> Add category </template>
    <template #body>
      <t-input v-model="categoryName" type="text" label="Name" />
    </template>
  </t-modal>
</template>

<script>
import TModal from "@/components/TModal.vue";
import TInput from "@/components/TInput.vue";
import createCategory from "@/api/category/createCategory";

export default {
  components: {
    TModal,
    TInput,
  },
  props: {
    categoryAddParams: {
      type: Object,
      default: () => ({
        restaurantId: 0,
        menuId: 0,
      }),
    },
  },
  emits: ["success", "error"],
  data() {
    return {
      categoryName: "",
      loading: false,
    };
  },
  methods: {
    async modalSubmit() {
      this.loading = true;
      try {
        const category = await createCategory(
          this.categoryAddParams.restaurantId,
          this.categoryAddParams.menuId,
          this.categoryName
        );
        this.$emit("success", category);
      } catch (e) {
        this.$emit("error", e.message);
      }
      this.loading = false;
    },
  },
};
</script>

<style></style>
