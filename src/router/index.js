import { createRouter, createWebHistory } from "vue-router";
import index from "../views/index.vue";
import SearchResults from "../components/SearchResults.vue";
import ShowDetailsContainer from "../components/ShowDetailsContainer.vue";

// const routes = createRouter(;

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Index",
      component: index,
      children: [
        {
          path: "/",
          name: "ShowDetailsContainer",
          component: ShowDetailsContainer,
        },
        {
          path: "/search",
          name: "SearchResults",
          component: SearchResults,
        },
      ],
    },
  ],
});

export default router;
