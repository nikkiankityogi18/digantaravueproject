<script>
import { fetchData } from "../api/api";
import ShowDetails from "./ShowDetails.vue";
// import Pagination from "./Pagination.vue";
export default {
  name: "ShowDetailsContainer",
  components: {
    ShowDetails,
    // Pagination,
  },
  props: {
    filteredData: {
      type: Array,
      default: () => [],
      required: true,
    },
  },

  data() {
    return {
      items: [],
      currentItems: [],
      isLoading: false,
      currentPage: 1,
      pageSize: 10, // Number of items to show on each page
      totalPages: 0,
    };
  },
  computed: {
    paginationRange() {
      const visibleButtons = 10;
      const lastButtons = 3;
      const currentPage = parseInt(this.currentPage);

      if (this.totalPages <= visibleButtons) {
        return Array.from({ length: this.totalPages }, (_, i) => i + 1);
      }

      const firstPage = Math.max(
        1,
        currentPage - Math.floor(visibleButtons / 2)
      );
      const lastPage = Math.min(
        this.totalPages,
        firstPage + visibleButtons - 1
      );

      const paginationArray = Array.from(
        { length: lastPage - firstPage + 1 },
        (_, i) => firstPage + i
      );

      if (firstPage > 1) {
        paginationArray.unshift("...");
        paginationArray.unshift(1, 2, 3);
      }
      if (lastPage < this.totalPages) {
        paginationArray.push("...");
        paginationArray.push(
          this.totalPages - lastButtons,
          this.totalPages - lastButtons + 1,
          this.totalPages - lastButtons + 2
        );
      }

      return paginationArray;
    },
  },
  watch: {
    "$route.query": {
      handler(newQuery, oldQuery) {
        this.getData();
      },
      immediate: true, // Call the handler immediately when the component is created
    },
  },

  methods: {
    async getData() {
      try {
        this.isLoading = true;
        this.items = await fetchData();

        this.isLoading = false;
        this.updateCurrentItems();
      } catch (error) {
        // Handle the error
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updateCurrentItems();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;

        this.updateCurrentItems();
      }
    },
    updateCurrentItems() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      if (this.$route.path == "/") {
        this.currentItems = this.items?.slice(start, end);
        this.totalPages = Math.ceil(this.items.length / this.pageSize);
      } else {
        this.currentItems = this.filteredData?.slice(start, end);
        this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
      }
    },
    handleChangePage(page) {
      this.currentPage = page;
      this.updateCurrentItems();
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<template>
  <div class="mx-4">
    <div v-if="!isLoading">
      <div v-if="currentItems.length > 0 || filteredData.length > 0">
        <div v-for="item in currentItems" :key="item.name">
          <ShowDetails :details="item" />
        </div>

        <!-- Pagination Controls -->
        <div class="my-4">
          <div class="flex justify-between items-center">
            <button
              class="p-2 m-1 rounded-lg bg-gray-200"
              @click="prevPage"
              :disabled="currentPage === 1"
            >
              Previous
            </button>
            <span>{{ currentPage }} / {{ totalPages }}</span>

            <button
              class="p-2 m-1 rounded-lg bg-gray-200"
              @click="nextPage"
              :disabled="currentPage === totalPages"
            >
              Next
            </button>
          </div>
          <div
            class="flex flex-row justify-between flex-wrap"
            v-if="totalPages > 1"
          >
            <span v-for="page in paginationRange" :key="page">
              <button
                class="p-2 m-1 rounded-lg bg-gray-200"
                @click="handleChangePage(page)"
                :disabled="page === currentPage"
              >
                {{ page }}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="shimmer flex justify-center items-center h-96 font-extrabold text-7xl mt-8"
    >
      <div>Loading.....</div>
    </div>
  </div>
</template>
<style scoped>
.shimmer {
  background-image: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-position: -200px 0;
  background-repeat: no-repeat;
  animation: shimmerAnimation 1.5s infinite linear;
}

@keyframes shimmerAnimation {
  100% {
    background-position: 200px 0;
  }
}
</style>
