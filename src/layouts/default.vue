<template>
  <div class="pb-5">
    <b-navbar type="dark" variant="dark" fill sticky>
      <b-container fluid>
        <b-navbar-brand href="/">My App</b-navbar-brand>
        <b-navbar-nav>
          <b-nav-item
            to="/"
            :active="currentRouteName === 'index' ? true : false"
            >Posts</b-nav-item
          >
          <b-nav-item
            to="/todos"
            :active="currentRouteName === 'todos' ? true : false"
            >Todos</b-nav-item
          >
        </b-navbar-nav>
      </b-container>
    </b-navbar>
    <b-container fluid>
      <Nuxt />
    </b-container>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {};
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>
