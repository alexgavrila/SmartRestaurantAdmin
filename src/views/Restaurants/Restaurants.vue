<template>
  <t-panel title="Restaurants">
    <t-button @click="modalAddOpen = true">Add</t-button>

    <restaurants-table
      ref="table"
      @clickDelete="handleModalDeleteOpen"
      @clickDetails="goToDetails"
    />
  </t-panel>
  <modal-add
    v-if="modalAddOpen"
    @modalclose="modalAddOpen = false"
    @success="successAdd"
    @error="errorAdd"
  />
  <modal-delete
    v-if="modalDeleteOpen"
    :restaurant-id="deleteRestaurantId"
    @modalclose="modalDeleteOpen = false"
    @success="successDelete"
    @error="errorDelete"
  />
</template>

<script>
import TButton from "@/components/TButton";
import TPanel from "@/components/TPanel";
import ModalAdd from "./components/ModalAdd";
import ModalDelete from "./components/ModalDelete";
import RestaurantsTable from "./components/RestaurantsTable";

export default {
  components: {
    TButton,
    ModalAdd,
    ModalDelete,
    RestaurantsTable,
    TPanel,
  },
  data() {
    return {
      modalAddOpen: false,
      modalDeleteOpen: false,
      deleteRestaurantId: 0,
    };
  },
  methods: {
    successAdd() {
      this.modalAddOpen = false;
      this.$refs.table.fetchData();
      this.$alert({ message: "The restaurant has been created!", type: "success" });
    },
    errorAdd() {
      this.$alert({ message: "There has been an error!", type: "error" });
    },
    handleModalDeleteOpen(id) {
      this.deleteRestaurantId = id;
      this.modalDeleteOpen = true;
    },
    successDelete() {
      this.modalDeleteOpen = false;
      this.$refs.table.fetchData();
    },
    errorDelete() {
      console.log("error");
    },
    async goToDetails(restaurant) {
      this.$store.dispatch("setBreadCrumbItem", { key: "restaurant", value: restaurant });
      this.$router.push({
        name: "RestaurantDetails",
        params: { restaurantId: restaurant.id },
      });
    },
  },
};
</script>
