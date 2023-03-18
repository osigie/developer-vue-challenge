<template>
  <div>
    <h1>todos</h1>
    <Table :fields="fields" variant="todos" />
  </div>
</template>

<script>
import Table from "~/components/Table/index.vue";
export default {
  name: "todos",
  components: {
    Table,
  },
  data() {
    return { items: [], fields: ["title", "completed"] };
  },
};
</script>

<style></style>
