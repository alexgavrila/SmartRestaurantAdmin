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
import restaurantsData from "@/api/restaurant/restaurants";
import TButton from "@/components/TButton";
import TableLite from "vue3-table-lite";

export default {
  components: {
    TButton,
    TableLite,
  },
  emits: ["clickDetails", "clickDelete"],
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
      try {
        this.rows = await restaurantsData();
      } catch (e) {
        this.error = e.message;
      }
    },
  },
};
</script>

<style></style>
