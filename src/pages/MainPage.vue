<template>
  <fragment>
    <section class="content__top content__top--catalog">
      <a
        class="breadcrumbs__link breadcrumbs__link--arrow"
        href="index.html"
        v-if="filterCategoryId"
      >&#129028;Вернуться в каталог</a>
      <h1 class="content__title" v-if="!filterCategoryId">Каталог</h1>
      <h1 class="content__title" v-else>{{ filteredCategory.title}}</h1>
      <span class="content__info">Всего товаров: {{ filteredProducts.length }}</span>
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
import categories from "@/data/categories";
import ProductList from "@/components/ProductList";
import BasePagination from "@/components/BasePagination";
import ProductsFilter from "@/components/ProductsFilter";
import { Plugin } from "vue-fragment";
import { getProductsMemories, getProductsColors } from "@/helpers/utils";

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
      productsPerPage: 6,

      productsMemoryList: getProductsMemories(products),
      productsColorList: getProductsColors(products),
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
          if (!product.memorySizes) continue;

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
    filteredCategory() {
      return categories.find(
        (category) => category.id === this.filterCategoryId
      );
    },
    productsOnPage() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
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
.content__info {
  display: block;
  margin-bottom: 5px;
}
.breadcrumbs__link--arrow {
  align-self: flex-start;
}
</style>
  
