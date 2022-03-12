<template>
  <t-panel v-loading="loading.detailsPanel" title="Details">
    <t-input v-model="restaurant.name" type="text" name="name" label="Name" />
    <!-- <t-input v-model="restaurantName" type="number" label="Number of tables" /> -->
    <div class="mb-2 flex justify-end">
      <t-button color="yellow" @click="updateRestaurant">Edit</t-button>
    </div>
  </t-panel>
  <div class="flex flex-col xl:flex-row">
    <t-panel v-loading="loading.menusPanel" class="xl:w-1/2 xl:mr-5" title="Menus">
      <t-button @click="modalAddMenuOpen = true">Add</t-button>
      <menus-table
        ref="table"
        @clickDelete="handleModalDeleteOpen"
        @clickMakeActive="makeActive"
        @clickDetails="goToDetails"
      />
    </t-panel>
    <t-panel v-loading="loading.tablesPanel" class="xl:w-1/2" title="Tables">
      <t-button @click="modalAddTableOpen = true">Add</t-button>
      <tables-table
        ref="table"
        @clickDelete="handleModalDeleteOpen"
        @clickMakeActive="makeActive"
        @clickDetails="goToDetails"
      />
    </t-panel>
  </div>

  <modal-add-menu
    v-if="modalAddMenuOpen"
    @modalclose="modalAddMenuOpen = false"
    @success="successAddMenu"
    @error="errorAdd"
  />
  <modal-delete
    v-if="modalDeleteOpen"
    :restaurant-id="deleteRestaurantId"
    @modalclose="modalDeleteOpen = false"
    @success="successDelete"
    @error="errorDelete"
  />

  <modal-add-table
    v-if="modalAddTableOpen"
    @modalclose="modalAddTableOpen = false"
    @success="successAddTable"
    @error="errorAdd"
  />
</template>

<script>
import TInput from "@/components/TInput";
import TButton from "@/components/TButton";
import TPanel from "@/components/TPanel";
import ModalAddMenu from "./components/ModalAddMenu";
import ModalDelete from "./components/ModalDelete";
import MenusTable from "./components/MenusTable";
import editRestaurant from "@/api/restaurant/editRestaurant";
import activateMenu from "@/api/menu/activateMenu";

import TablesTable from "./components/TablesTable";
import ModalAddTable from "./components/ModalAddTable";

export default {
  components: {
    TButton,
    TPanel,
    TInput,
    ModalAddMenu,
    ModalDelete,
    MenusTable,
    TablesTable,
    ModalAddTable,
  },
  props: {
    restaurantId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      restaurant: {
        id: 0,
        name: "",
      },
      modalAddMenuOpen: false,
      modalDeleteOpen: false,
      deleteMenuId: 0,

      modalAddTableOpen: false,

      loading: {
        detailsPanel: false,
        menusPanel: false,
        tablesPanel: false,
      },
    };
  },
  mounted() {
    this.restaurant = this.$store.state.breadcrumbs.restaurant;
  },
  methods: {
    successAddMenu() {
      this.$alert({
        message: "The menu has been created!",
        type: "success",
      });
      this.modalAddMenuOpen = false;
      this.$refs.table.fetchData();
    },
    errorAdd() {
      this.$alert({
        message: "There has been an error",
        type: "error",
      });
    },
    handleModalDeleteOpen(id) {
      this.deleteMenuId = id;
      this.modalDeleteOpen = true;
    },
    successDelete() {
      this.modalDeleteOpen = false;
      this.$refs.table.fetchData();
    },
    errorDelete() {
      console.log("error");
    },
    successAddTable() {
      this.$alert({
        message: "The table has been created!",
        type: "success",
      });
      this.modalAddTableOpen = false;
      this.$refs.table.fetchData();
    },
    async updateRestaurant() {
      this.loading.detailsPanel = true;
      try {
        await editRestaurant(this.restaurant.id, {
          name: this.restaurant.name,
        });
        this.$store.dispatch("setBreadCrumbItem", "restaurant", this.restaurant);
        this.$alert({ message: "The restaurant has been updated", type: "success" });
      } catch (e) {
        this.$alert({ message: "There has been an error", type: "error" });
      }
      this.loading.detailsPanel = false;
    },
    async makeActive(id) {
      this.loading.menusPanel = true;
      try {
        await activateMenu(this.restaurant.id, id);
        this.$refs.table.fetchData();
        this.$alert({ message: "The menu has been activated", type: "success" });
      } catch (e) {
        this.$alert({ message: "There has been an error", type: "error" });
      }
      this.loading.menusPanel = false;
    },
    async goToDetails(menu) {
      this.$store.dispatch("setBreadCrumbItem", { key: "menu", value: menu });
      console.log(this.restaurant);
      this.$router.push({
        name: "MenuDetails",
        params: { restaurantId: this.restaurant.id, menuId: menu.id },
      });
    },
  },
};
</script>
