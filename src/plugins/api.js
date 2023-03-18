import createApiRepo from "~/api";
export default (ctx, inject) => {
  inject("api", createApiRepo(ctx.$axios));
};
