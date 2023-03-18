<template>
  <div>
    <h1 class="my-4">Todos</h1>
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
    return { fields: ["title", "completed"] };
  },
};
</script>

<style></style>
