<template>
  <b-container fluid>
    <div
      class="d-flex flex-column justify-content-center align-items-center align-content-center"
    >
      <h1 v-if="error.statusCode === 404" class="mb-5">
        {{ pageNotFound }}
      </h1>
      <h1 v-else class="mb-5">{{ otherError }}</h1>
      <b-button variant="primary" class="mb-5" @click="$router.push('/')"
        >Home page</b-button
      >
    </div>
  </b-container>
</template>

<script>
export default {
  name: "EmptyLayout",
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped></style>
