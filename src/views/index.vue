<script>
import Header from "../components/Header.vue";
import ShowDetails from "../components/ShowDetails.vue";
import { fetchData } from "../api/api";

export default {
  name: "App",
  components: {
    Header,
    ShowDetails,
  },
  data() {
    return {
      items: [],
      isLoading: false,
    };
  },
  async created() {
    try {
      this.isLoading = true;
      this.items = await fetchData();
      this.isLoading = false;
    } catch (error) {
      // Handle the error
    }
  },
};
</script>

<template>
  <div class="max-w-5xl m-auto">
    <Header :satellites-data="items" />
    <router-view></router-view>
    <!-- <div v-if="!isLoading">
      <div v-for="item in items.slice(0, 9)" :key="item.name">
        <ShowDetails :details="item" />
      </div>
    </div>
    <div
      v-else
      class="shimmer flex justify-center items-center h-96 font-extrabold text-7xl mt-8"
    >
      <div>Loading.....</div>
    </div> -->
  </div>
</template>
