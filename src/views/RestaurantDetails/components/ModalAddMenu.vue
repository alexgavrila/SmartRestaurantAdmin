<template>
  <t-modal v-loading="loading" v-bind="$attrs" @modalsubmit="modalSubmit">
    <template #title> Add menu </template>
    <template #body>
      <t-input v-model="menuName" type="text" label="Name" />
    </template>
  </t-modal>
</template>

<script>
import TModal from "@/components/TModal.vue";
import TInput from "@/components/TInput.vue";
import createMenu from "@/api/menu/createMenu";

export default {
  components: {
    TModal,
    TInput,
  },
  emits: ["success", "error"],
  data() {
    return {
      menuName: "",
      loading: false,
    };
  },
  methods: {
    async modalSubmit() {
      this.loading = true;
      try {
        const menu = await createMenu(this.$route.params.restaurantId, this.menuName);
        this.$emit("success", menu);
      } catch (e) {
        this.$emit("error", e.message);
      }
      this.loading = false;
    },
  },
};
</script>

<style></style>
