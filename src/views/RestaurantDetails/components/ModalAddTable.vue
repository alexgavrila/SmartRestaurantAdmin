<template>
  <t-modal v-loading="loading" v-bind="$attrs" @modalsubmit="modalSubmit">
    <template #title> Add table </template>
    <template #body>
      <t-input v-model="tableName" type="text" label="Name" />
    </template>
  </t-modal>
</template>

<script>
import TModal from "@/components/TModal.vue";
import TInput from "@/components/TInput.vue";
import createTable from "@/api/table/createTable";

export default {
  components: {
    TModal,
    TInput,
  },
  emits: ["success", "error"],
  data() {
    return {
      tableName: "",
      loading: false,
    };
  },
  methods: {
    async modalSubmit() {
      this.loading = true;
      try {
        const table = await createTable(this.$route.params.restaurantId, this.tableName);
        this.$emit("success", table);
      } catch (e) {
        this.$emit("error", e.message);
      }
      this.loading = false;
    },
  },
};
</script>

<style></style>
