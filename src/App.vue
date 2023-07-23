<script>
import index from "../src/views/index.vue";

export default {};
</script>

<template>
  <div class="mx-4">
    <index />
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

<style scoped></style>
