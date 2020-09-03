<template>
  <fragment>
    <section class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info">Всего товаров: {{ products.length }}</span>
    </section>
    <section class="catalog">
      <ProductsFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :color.sync="filterColor"
        :memory.sync="filterMemory"
        :listOfColors="productsColorList"
        :listOfMemories="productsMemoryList"
      />
      <main class="catalog__main">
        <h2 v-if="filteredProducts.length === 0">Товар не найден</h2>
        <ProductList :products="productsOnPage" />
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
      </main>
    </section>
  </fragment>
</template>

<script>
import Vue from "vue";
import products from "@/data/products";
import ProductList from "@/components/ProductList";
import BasePagination from "@/components/BasePagination";
import ProductsFilter from "@/components/ProductsFilter";
import { Plugin } from "vue-fragment";

Vue.use(Plugin);

export default {
  name: "MainPage",
  props: {
    pageParams: Object,
  },
  components: { ProductsFilter, ProductList, BasePagination },

  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: this.pageParams.id || 0,
      filterColor: "",
      filterMemory: [],

      page: 1,
      productsPerPage: 3,

      productsMemoryList: this.getListFromProductsKey("memorySizes"),
      productsColorList: this.getListFromProductsKey("colors"),
    };
  },

  computed: {
    filteredProducts() {
      let filteredProducts = products;

      if (this.filterPriceFrom) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price > this.filterPriceFrom
        );
      }

      if (this.filterPriceTo) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price < this.filterPriceTo
        );
      }

      if (this.filterCategoryId) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoryId === this.filterCategoryId
        );
      }

      if (this.filterColor) {
        let filteredArr = [];

        for (let product of filteredProducts) {
          product.colors.forEach((color) =>
            color.value === this.filterColor ? filteredArr.push(product) : false
          );
        }

        filteredProducts = filteredArr;
      }

      if (this.filterMemory.length !== 0) {
        let filteredArr = [];

        for (let product of filteredProducts) {
          if (!product.hasOwnProperty("memorySizes")) continue;

          product.memorySizes.forEach((memory) => {
            if (this.filterMemory.includes(memory.value)) {
              filteredArr.includes(product) ? false : filteredArr.push(product);
            }
          });
        }

        filteredProducts = filteredArr;
      }

      return filteredProducts;
    },
    products() {
      return products;
    },
    productsOnPage() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },

  methods: {
    getListFromProductsKey(key) {
      let filteredArr = new Set();

      if (key === "memorySizes") {
        let productsCount = {};

        for (let product of products) {
          if (!product.hasOwnProperty("memorySizes")) continue;

          product[key].forEach((item) => {
            filteredArr.add(item.value);

            if (productsCount.hasOwnProperty(item.value)) {
              productsCount[item.value] = productsCount[item.value] + 1;
            } else {
              productsCount[item.value] = 1;
            }
          });
        }

        return [...filteredArr].map((el, i) => {
          return {
            id: i + 1,
            value: el,
            checked: false,
            numOfProducts: productsCount[el],
          };
        });
      }

      for (let product of products) {
        product[key].forEach((item) => filteredArr.add(item.value));
      }

      return [...filteredArr].map((el, i) => {
        return { id: i + 1, value: el, checked: false };
      });
    },
  },
};
</script>

<style>
.catalog {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.catalog__main {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
  
