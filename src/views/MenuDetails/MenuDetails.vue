<template>
  <t-panel v-loading="loading.detailsPanel" title="Details">
    <t-input v-model="menu.name" type="text" name="name" label="Name" />
    <!-- <t-input v-model="restaurantName" type="number" label="Number of tables" /> -->
    <div class="mb-2 flex justify-end">
      <t-button color="yellow" @click="updateMenu">Edit</t-button>
    </div>
  </t-panel>
  <div class="flex">
    <tree
      ref="tree"
      class="w-2/5 mr-5"
      @clickAddCategory="clickAddCategory"
      @clickAddItem="clickAddItem"
      @clickEdit="clickEdit"
    />
    <component
      :is="clickEditDetails.type + '-edit'"
      v-if="clickEditDetails.type"
      :key="clickEditDetails.type + clickEditDetails.details.id"
      :details="clickEditDetails.details"
      class="w-3/5"
      @editSuccess="clickEditSuccess"
    />
  </div>
  <ModalAddCategory
    v-if="modalAddCategoryOpen"
    :category-add-params="categoryAddParams"
    @modalclose="modalAddCategoryOpen = false"
    @success="successAddCategory"
    @error="errorAddCategory"
  />

  <ModalAddItem
    v-if="modalAddItemOpen"
    :item-add-params="itemAddParams"
    @modalclose="modalAddItemOpen = false"
    @success="successAddItem"
    @error="errorAddItem"
  />
</template>

<script>
import Tree from "./components/CategoriesTree.vue";
import TButton from "@/components/TButton";
import TPanel from "@/components/TPanel";
import TInput from "@/components/TInput";
import ModalAddCategory from "./components/ModalAddCategory.vue";
import ModalAddItem from "./components/ModalAddItem.vue";
import CategoryEdit from "./components/CategoryEdit.vue";
import ItemEdit from "./components/ItemEdit.vue";
import DefaultEdit from "./components/DefaultEdit.vue";
import editMenu from "@/api/menu/editMenu";

export default {
  components: {
    Tree,
    ModalAddCategory,
    ModalAddItem,
    CategoryEdit,
    ItemEdit,
    DefaultEdit,
    TPanel,
    TButton,
    TInput,
  },
  props: {
    restaurantId: {
      type: String,
      required: true,
    },
    menuId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      modalAddCategoryOpen: false,
      modalAddItemOpen: false,
      categoryAddParams: {
        restaurantId: 0,
        menuId: 0,
      },
      itemAddParams: {
        restaurantId: 0,
        menuId: 0,
        categoryId: 0,
      },

      menu: {
        id: 0,
        name: "",
      },

      loading: {
        detailsPanel: false,
      },

      clickEditDetails: {
        type: "default",
        details: {},
      },
    };
  },
  mounted() {
    this.menu = this.$store.state.breadcrumbs.menu;
  },
  methods: {
    clickAddCategory() {
      this.categoryAddParams = {
        restaurantId: this.restaurantId,
        menuId: this.menuId,
      };

      this.modalAddCategoryOpen = true;
    },
    clickAddItem(categoryId) {
      this.itemAddParams = {
        restaurantId: this.restaurantId,
        menuId: this.menuId,
        categoryId,
      };

      this.modalAddItemOpen = true;
    },
    successAddCategory() {
      this.modalAddCategoryOpen = false;
      this.$alert({
        message: "The category has been created!",
        type: "success",
      });
      this.$refs.tree.fetchData();
    },
    errorAddCategory() {
      this.$alert({
        message: "There has been an error",
        type: "error",
      });
    },
    successAddItem() {
      this.$alert({
        message: "The item has been created!",
        type: "success",
      });
      this.modalAddItemOpen = false;
      this.$refs.tree.fetchData();
    },
    errorAddItem() {
      this.$alert({
        message: "There has been an error",
        type: "error",
      });
    },
    async updateMenu() {
      this.loading.detailsPanel = true;
      try {
        await editMenu(this.restaurantId, this.menuId, {
          name: this.menu.name,
        });
        this.$store.dispatch("setBreadCrumbItem", "menu", this.menu);
        this.$alert({ message: "The menu has been updated", type: "success" });
      } catch (e) {
        this.$alert({ message: "There has been an error", type: "error" });
        console.log(e);
      }
      this.loading.detailsPanel = false;
    },
    clickEdit(node) {
      if (Object.hasOwn(node, "children")) {
        this.clickEditDetails = {
          type: "category",
          details: node,
        };
      } else {
        this.clickEditDetails = {
          type: "item",
          details: node,
        };
      }
    },
    clickEditSuccess() {
      this.$refs.tree.fetchData();
    },
  },
};
</script>

<style></style>
