<template>
  <t-panel v-loading="loading.detailsPanel" title="Category" class="flex flex-col">
    <div class="flex-1">
      <t-input v-model="name" type="text" name="name" label="Name" />
    </div>
    <div class="mb-2 flex justify-end">
      <t-button color="yellow" @click="updateCategory">Edit</t-button>
    </div>
  </t-panel>
</template>

<script>
import TPanel from "@/components/TPanel";
import TInput from "@/components/TInput";
import TButton from "@/components/TButton";
import editCategory from "@/api/category/editCategory";

export default {
  components: { TPanel, TInput, TButton },
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
  emits: ["editSuccess"],
  data() {
    return { name: this.details.name, loading: { detailsPanel: false } };
  },
  methods: {
    async updateCategory() {
      this.loading.detailsPanel = true;
      try {
        await editCategory(
          this.$route.params.restaurantId,
          this.$route.params.menuId,
          this.details.id,
          {
            name: this.name,
          }
        );
        this.$alert({ message: "The category has been updated", type: "success" });
        this.$emit("editSuccess");
      } catch (e) {
        this.$alert({ message: "There has been an error", type: "error" });
        console.log(e);
      }
      this.loading.detailsPanel = false;
    },
  },
};
</script>

<style></style>
