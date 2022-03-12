<template>
  <t-panel v-loading="loading.detailsPanel" title="Item" class="flex flex-col">
    <div
      class="flex-1 max-h-120 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar pr-2"
    >
      <t-input v-model="name" type="text" name="name" label="Name" />
      <t-input v-model="price" type="number" name="name" label="Price" />
      <t-textbox v-model="description" label="Description" :resize="false" />
      <t-input
        ref="upload"
        type="file"
        name="picture"
        label="Picture"
        accept="image/png, image/jpeg"
        @update:modelValue="handleFileUpload"
      />
      <div class="flex justify-center">
        <img class="max-w-md" :src="picturePath" />
      </div>
    </div>
    <div class="mb-2 flex justify-end">
      <t-button color="yellow" @click="updateCategory">Edit</t-button>
    </div></t-panel
  >
</template>

<script>
import TPanel from "@/components/TPanel";
import TInput from "@/components/TInput";
import TButton from "@/components/TButton";
import TTextbox from "@/components/TTextbox";
import editItem from "@/api/item/editItem";

export default {
  components: { TPanel, TInput, TButton, TTextbox },
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
  emits: ["editSuccess"],
  data() {
    return {
      name: this.details.name,
      price: this.details.price,
      description: this.details.description,
      picture: {},
      uploadsPath: process.env.VUE_APP_UPLOADS_PATH,
      loading: { detailsPanel: false },
    };
  },
  computed: {
    picturePath() {
      if (this.details.picture && !this.picture.name) {
        return this.uploadsPath + "/" + this.details.picture;
      } else if (this.picture.name) {
        return URL.createObjectURL(this.picture);
      }
      return "";
    },
  },
  methods: {
    handleFileUpload() {
      this.picture = this.$refs.upload.$refs.input.files[0];
    },
    async updateCategory() {
      this.loading.detailsPanel = true;

      try {
        await editItem(
          this.$route.params.restaurantId,
          this.$route.params.menuId,
          this.details.CategoryId,
          this.details.id,
          {
            name: this.name,
            description: this.description,
            price: this.price,
            picture: this.picture,
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
