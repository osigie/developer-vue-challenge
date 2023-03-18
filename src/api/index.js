export default ($axios) => {
  return {
    posts() {
      return $axios.$get(`posts`);
    },
    todos() {
      return $axios.$get(`todos`);
    },
    getUser(id) {
      return $axios.$get(`users/${id}`);
    },
  };
};
