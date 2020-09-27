<template>
  <fragment>
    <main class="catalog container">
      <section class="content__top content__top--catalog">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info"
          >Всего товаров: {{ numberFormat(countProducts) }}</span
        >
      </section>

      <section class="catalog__content">
        <ProductsFilter v-bind.sync="filters" />

        <BaseLoaderSpinner v-if="isProductsLoading" />
        <!-- <div v-if="isProductsLoading">
          <div class="loader-inner">
            <div class="loader-line-wrap">
              <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
              <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
              <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
              <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
              <div class="loader-line"></div>
            </div>
          </div>
        </div> -->

        <div v-else-if="isproductsLoadingFailed">
          OOOOOPS!!!!!
          <button @click="loadProducts">Попробовать еще раз</button>
        </div>

        <main class="catalog__main" v-else>
          <h2 v-if="!countProducts">Товар не найден</h2>
          <ProductList v-else :products="products" />
          <BasePagination
            v-model="page"
            :count="countProducts"
            :per-page="productsPerPage"
            v-if="countProducts"
          />
        </main>
      </section>
    </main>
  </fragment>
</template>

<script>
import Vue from "vue";
import categories from "@/data/categories";
import axios from "axios";
import { BASE_API_URL } from "@/config.js";

import ProductList from "@/components/mainPageComponents/ProductList";
import BasePagination from "@/components/BasePagination";
import ProductsFilter from "@/components/mainPageComponents/ProductsFilter";
import BaseLoaderSpinner from "@/components/BaseLoaderSpinner";

import { getProductsMemories, getProductsColors } from "@/helpers/utils";

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
};
</script>

<style>
.catalog {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin-bottom: 50px;
}
.catalog__content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.catalog__main {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.content__info {
  display: block;
  margin-bottom: 5px;
}
.breadcrumbs__link--arrow {
  align-self: flex-start;
}
</style>
  
