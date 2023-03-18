<template>
  <div>
    <b-input-group class="mb-1 w-50" size="md">
      <template #prepend>
        <b-input-group-text>
          <b-icon icon="search"></b-icon
        ></b-input-group-text>
      </template>
      <b-form-input v-model="filter" placeholder="Search"></b-form-input>

      <b-input-group-append>
        <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
      </b-input-group-append>
    </b-input-group>
    <b-table
      striped
      hover
      :items="items"
      :fields="fields"
      :filter-included-fields="['title']"
      :filter="filter"
      show-empty
      :current-page="currentPage"
      :per-page="perPage"
      @row-clicked="handleClick"
      :busy.sync="isBusy"
      @filtered="onFiltered"
    >
      <template #cell(completed)="row" v-if="variant === 'todos'">
        <b-form-checkbox v-model="row.item.completed"> </b-form-checkbox>
      </template>
      <template #table-busy>
        <div class="text-center">
          <b-spinner label="Loading..."></b-spinner>
        </div>
      </template>
    </b-table>

    <b-row>
      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
    <b-modal :id="infoModal.id" title="Creator" ok-only @hide="resetInfoModal">
      <pre>Posted by {{ infoModal.content }}</pre>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    fields: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    variant: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  data() {
    return {
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      infoModal: {
        id: "info-modal",
        content: "",
      },
      filter: null,
      items: [],
      isBusy: false,
    };
  },
  mounted() {
    this.getData(this.type);
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
    },
    resetInfoModal() {
      this.infoModal.content = "";
    },
    handleClick(item) {
      this.getUser(item.userId);
    },
    sendToast() {
      this.$bvToast.toast(`Error fetching data`, {
        title: "Error",
        variant: "danger",
        autoHideDelay: 1000,
        appendToast: false,
        solid: true,
      });
    },

    async getUser(id) {
      try {
        const res = await this.$nuxt.$api.getUser(id);
        this.infoModal.content = res.name;
        this.$root.$emit("bv::show::modal", this.infoModal.id);
      } catch (error) {
        this.sendToast();
      }
    },
    async getData(type) {
      this.isBusy = true;
      let call;
      type === "Posts"
        ? (call = this.$nuxt.$api.posts())
        : (call = this.$nuxt.$api.todos());
      try {
        const res = await call;
        this.items = res;
        this.totalRows = res.length;
        this.isBusy = false;
      } catch (error) {
        this.sendToast();
        this.isBusy = false;
      }
    },
  },
};
</script>
