<script>
import { fetchData } from "../api/api";
export default {
  name: "ShowDetails",
  //   data() {
  //     return {
  //       country: [],
  //       orbit: [],
  //       objectType: [],
  //     };
  //   },
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
};
</script>
<template>
  <div class="flex flex-col justify-between w-full shadow-lg mt-8">
    <div class="flex flex-row w-full">
      <div class="">
        <img class="h-32" src="https://picsum.photos/200" />
      </div>
      <div class="mx-8">
        <ul class="font-semibold text-lg">
          <li class="mb-1">{{ details?.name }}</li>
          <li class="my-1">{{ details?.noradCatId }}</li>
          <li class="my-1">{{ details?.orbitCode }}</li>
          <li class="mt-1">{{ details?.objectType }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
