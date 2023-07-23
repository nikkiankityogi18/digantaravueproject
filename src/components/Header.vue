<script>
export default {
  name: "Header",
  data() {
    return {
      selectedOption1: "Country",
      selectedOption2: "Orbit",
      selectedOption3: "Object-type",
      searchQuery: "",
      countryData: [],
      orbitData: [],
      objectTypeData: [],
    };
  },
  props: {
    satellitesData: {
      type: Array,
      required: true,
    },
  },

  methods: {
    uniqueArray(arr) {
      const data = arr.filter(
        (value, index, self) =>
          self.indexOf(value) == index && value != null && value != undefined
      );
      return data;
    },

    updateCountryRoute() {
      const query = { country: this.selectedOption1 };
      this.$router.push({ path: "/search", query });
    },
    updateOrbitRoute() {
      const query = { orbit: this.selectedOption2 };
      this.$router.push({ path: "/search", query });
    },
    updateObjectRoute() {
      const query = { object: this.selectedOption3 };
      this.$router.push({ path: "/search", query });
    },
    updateSeachRoute() {
      const query = { search: this.searchQuery };
      this.$router.push({ path: "/search", query });
    },
    setData() {
      const countryArr = this.satellitesData?.map((e) => e.countryCode);
      const orbitArr = this.satellitesData?.map((e) => e.orbitCode);
      const objectTypeArr = this.satellitesData?.map((e) => e.objectType);

      this.countryData = this.uniqueArray(countryArr);
      this.orbitData = this.uniqueArray(orbitArr);
      this.objectTypeData = this.uniqueArray(objectTypeArr);
    },
  },

  beforeUpdate() {
    this.setData();
  },
};
</script>

<template>
  <div class="flex justify-center py-8 w-full shadow-lg">
    <div class="flex flex-col justify-center w-full">
      <div class="flex justify-center">
        <h1 class="text-3xl font-bold">Satellites Information</h1>
      </div>

      <div class="flex justify-center mt-8 w-full">
        <div class="w-full flex justify-center relative">
          <input
            class="w-4/5 rounded-lg border p-3 m-8 text-xl"
            type="text"
            v-model="searchQuery"
            placeholder="Search..."
            @change="updateSeachRoute"
          />
          <span class="absolute top-12 right-32 w-6">
            <router-link :to="'/search?search=' + searchQuery"
              ><img src="/search-icon.png"
            /></router-link>
          </span>
        </div>
      </div>
      <div class="flex justify-between m-auto w-4/5">
        <select
          @change="updateCountryRoute"
          v-model="selectedOption1"
          class="border border-gray-300 rounded px-4 py-2 w-1/4"
        >
          <option>Country</option>
          <option
            v-for="country in countryData"
            :key="country"
            :value="country"
          >
            {{ country }}
          </option>
        </select>
        <select
          @change="updateOrbitRoute"
          v-model="selectedOption2"
          class="border border-gray-300 rounded px-4 py-2 w-1/4"
        >
          <option>Orbit</option>
          <option v-for="orbit in orbitData" :key="country" :value="orbit">
            {{ orbit }}
          </option>
        </select>
        <select
          @change="updateObjectRoute"
          v-model="selectedOption3"
          class="border border-gray-300 rounded px-4 py-2 w-1/4"
        >
          <option>Object-type</option>
          <option
            v-for="object in objectTypeData"
            :key="object"
            :value="object"
          >
            {{ object }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
