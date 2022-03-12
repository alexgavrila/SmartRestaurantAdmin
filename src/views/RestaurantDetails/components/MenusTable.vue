<template>
  <table-lite
    :is-slot-mode="true"
    :is-loading="loading"
    :columns="columns"
    :rows="rows"
    :total="rows.length"
    :sortable="sortable"
  >
    <template #actions="data">
      <div class="flex justify-center">
        <t-button
          v-if="!data.value.active"
          size="small"
          color="green"
          @click="$emit('clickMakeActive', data.value.id)"
          >Activate</t-button
        >
        <t-button size="small" color="yellow" @click="$emit('clickDetails', data.value)"
          >Details</t-button
        >
        <t-button size="small" color="red" @click="$emit('clickDelete', data.value.id)"
          >Delete</t-button
        >
      </div>
    </template>
  </table-lite>
</template>

<script>
import menusData from "@/api/menu/menus";
import TButton from "@/components/TButton";
import TableLite from "vue3-table-lite";

export default {
  components: {
    TButton,
    TableLite,
  },
  emits: ["clickDetails", "clickDelete", "clickMakeActive"],
  data() {
    return {
      columns: [
        {
          label: "ID",
          field: "id",
          sortable: true,
          isKey: true,
        },
        {
          label: "Name",
          field: "name",
          sortable: true,
          width: "99%",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
      loading: false,
      sortable: {
        order: "name",
        sort: "asc",
      },
      error: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        this.rows = await menusData(this.$route.params.restaurantId);
      } catch (e) {
        this.error = e.message;
      }
      this.loading = false;
    },
  },
};
</script>

<style></style>
