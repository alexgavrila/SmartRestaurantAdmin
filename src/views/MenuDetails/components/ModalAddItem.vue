<template>
  <t-modal v-loading="loading" v-bind="$attrs" @modalsubmit="modalSubmit">
    <template #title> Add item </template>
    <template #body>
      <t-input v-model="itemName" type="text" label="Name" />
    </template>
  </t-modal>
</template>

<script>
import TModal from "@/components/TModal.vue";
import TInput from "@/components/TInput.vue";
import createItem from "@/api/item/createItem";

export default {
  components: {
    TModal,
    TInput,
  },
  props: {
    itemAddParams: {
      type: Object,
      default: () => ({
        restaurantId: 0,
        menuId: 0,
        categoryId: 0,
      }),
    },
  },
  emits: ["success", "error"],
  data() {
    return {
      itemName: "",
      loading: false,
    };
  },
  methods: {
    async modalSubmit() {
      this.loading = true;
      try {
        const item = await createItem(
          this.itemAddParams.restaurantId,
          this.itemAddParams.menuId,
          this.itemAddParams.categoryId,
          this.itemName
        );
        this.$emit("success", item);
      } catch (e) {
        this.$emit("error", e.message);
      }
      this.loading = false;
    },
  },
};
</script>

<style></style>
