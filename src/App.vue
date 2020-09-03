<template>
  <component :is="currentPageComponent" :page-params="currentPageParams" />
</template>

<script>
import MainPage from "@/pages/MainPage";
import ProductPage from "@/pages/ProductPage";
import NotFoundPage from "@/pages/NotFoundPage";
import eventBus from "@/eventBus";

const routes = {
  main: "MainPage",
  product: "ProductPage",
};

export default {
  name: "App",
  components: {
    MainPage,
    ProductPage,
    NotFoundPage,
  },
  data() {
    return {
      currentPage: "main",
      currentPageParams: {},
    };
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || "NotFoundPage";
    },
  },
  methods: {
    gotoPage(pageName, pageParams) {
      this.currentPage = pageName;
      this.currentPageParams = pageParams || {};
    },
  },
  created() {
    eventBus.$on("goto-page", (pageName, pageParams) =>
      this.gotoPage(pageName, pageParams)
    );
  },
};
</script>