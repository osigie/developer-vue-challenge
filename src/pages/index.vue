<template>
  <div>
    <h1 class="my-4">Posts</h1>
    <Table :fields="fields" type="Posts" />
  </div>
</template>

<script>
import Table from "~/components/Table/index.vue";
export default {
  components: {
    Table,
  },
  data() {
    return {
      fields: ["title", "body"],
    };
  },
};
</script>

<style></style>
