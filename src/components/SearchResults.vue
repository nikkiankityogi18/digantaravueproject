<script>
import { fetchData } from "../api/api";
import ShowDetailsContainer from "./ShowDetailsContainer.vue";
export default {
  name: "SearchResult",
  components: {
    ShowDetailsContainer,
  },
  data() {
    return {
      items: [],
      queryParams: {},
      queryKey: "",
      filteredData: [],
    };
  },
  computed: {
    filteredData() {
      // Handle the query parameter change
      switch (this.queryKey) {
        case "country":
          this.filteredData = this.items.filter(
            (e) => e.countryCode === this.$route.query.country
          );
          break;
        case "orbit":
          this.filteredData = this.items.filter(
            (e) => e.orbitCode === this.$route.query.orbit
          );
          break;
        case "object":
          this.filteredData = this.items.filter(
            (e) => e.objectType === this.$route.query.object
          );
          break;
        case "search":
          this.filteredData = this.items.filter(
            (e) =>
              e.noradCatId == this.$route.query.search ||
              e.name == this.$route.query.search
          );

          break;
        default:
          this.filteredData = this.items;

          break;
      }

      return this.filteredData;
    },
  },
  methods: {
    async getData() {
      this.items = await fetchData();
    },
  },
  watch: {
    "$route.query": {
      handler(newQuery, oldQuery) {
        // Update the query parameters
        // this.getData();

        this.queryParams = newQuery;
        this.queryKey = Object.keys(this.queryParams)[0];
      },
      immediate: true, // Call the handler immediately when the component is created
    },
  },
  created() {
    this.getData();
  },
};
</script>
<template>
  <div>
    <ShowDetailsContainer :filtered-data="filteredData" />
  </div>
</template>
<style></style>
