<template>
  <main class="container content">
    <section class="content__head content__head--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"
        >Всего товаров: {{ numberFormat(countProducts) }}</span
      >
    </section>

    <section class="content__body">
      <ProductsFilter v-bind.sync="filters" />

      <BaseLoaderSpinner v-if="isProductsLoading" />

      <div v-else-if="isproductsLoadingFailed">
        OOOOOPS!!!!!
        <button @click="loadProducts">Попробовать еще раз</button>
      </div>

      <section class="content__main" v-else>
        <h2 v-if="!countProducts">Товар не найден</h2>
        <ProductList v-else :products="products" />
        <BasePagination
          v-model="page"
          :count="countProducts"
          :per-page="productsPerPage"
          v-if="countProducts"
        />
      </section>
    </section>
  </main>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { BASE_API_URL } from "@/config.js";

import ProductList from "@/components/mainPageComponents/ProductList";
import BasePagination from "@/components/BasePagination";
import ProductsFilter from "@/components/mainPageComponents/ProductsFilter";
import BaseLoaderSpinner from "@/components/BaseLoaderSpinner";

export default {
  name: "MainPage",
  props: {
    pageParams: Object,
  },
  components: {
    ProductsFilter,
    ProductList,
    BasePagination,
    BaseLoaderSpinner,
  },

  data() {
    return {
      filters: {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        colorId: 0,
      },

      productsData: null,
      isProductsLoading: false,
      isproductsLoadingFailed: false,

      page: 1,
      productsPerPage: 6,
    };
  },

  watch: {
    page() {
      this.loadProducts();
    },

    filters: {
      handler() {
        this.loadProducts();
      },
      deep: true,
      immediate: true,
    },
  },

  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => {
            return {
              ...product,
              image: product.image.file.url,
            };
          })
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 1;
    },
  },

  methods: {
    loadProducts() {
      this.isProductsLoading = true;
      this.isproductsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);

      // setTimeOut is used here to send just one request with all data
      this.loadProductsTimer = setTimeout(() => {
        return axios
          .get(`${BASE_API_URL}products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              minPrice: this.filters.priceFrom,
              maxPrice: this.filters.priceTo,
              categoryId: this.filters.categoryId,
              colorId: this.filters.colorId,
            },
          })
          .then((response) => (this.productsData = response.data))
          .catch(() => (this.isproductsLoadingFailed = true))
          .finally(() => (this.isProductsLoading = false));
      }, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 35px 0 100px;

  @media screen and (max-width: 1100px) {
    padding: 20px 0 50px;
  }
  @media screen and (max-width: 640px) {
    padding: 10px 0 20px;
  }

  &__head {
    margin-bottom: 35px;

    @media screen and (max-width: 1100px) {
      margin-bottom: 15px;
    }
    @media screen and (max-width: 640px) {
      margin-bottom: 10px;
    }
  }

  &__head--catalog {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__title {
    font-family: "PressStart";
    font-size: 25px;
    text-transform: uppercase;
    margin-bottom: 10px;

    @media screen and (max-width: 640px) {
      font-size: 16px;
      margin-bottom: 5px;
    }
  }

  &__info {
    font-size: 16px;
    font-weight: 300;
    line-height: 1;
    color: #9d9d9d;
  }

  &__body {
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    @media screen and (max-width: 1100px) {
      font-size: 16px;
      margin-bottom: 5px;
      flex-direction: column;
    }
  }

  &__main {
    flex-basis: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>