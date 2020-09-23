<template>
  <fragment>
    <main class="catalog container">
      <section class="content__top content__top--catalog">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info">Всего товаров: {{ numberFormat(filteredProducts.length) }}</span>
      </section>
      <section class="catalog__content">
        <ProductsFilter
          v-bind.sync="filters"
          :listOfColors="productsColorList"
          :listOfMemories="productsMemoryList"
        />
        <main class="catalog__main">
          <h2 v-if="filteredProducts.length === 0">Товар не найден</h2>
          <ProductList :products="productsOnPage" />
          <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
        </main>
      </section>
    </main>
  </fragment>
</template>

<script>
import Vue from "vue";
import products from "@/data/products";
import categories from "@/data/categories";

import ProductList from "@/components/mainPageComponents/ProductList";
import BasePagination from "@/components/BasePagination";
import ProductsFilter from "@/components/mainPageComponents/ProductsFilter";

import { getProductsMemories, getProductsColors } from "@/helpers/utils";

export default {
  name: "MainPage",
  props: {
    pageParams: Object,
  },
  components: { ProductsFilter, ProductList, BasePagination },

  data() {
    return {
      filters: {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        color: "",
        memory: [],
      },

      page: 1,
      productsPerPage: 6,

      productsMemoryList: getProductsMemories(products),
      productsColorList: getProductsColors(products),
    };
  },

  computed: {
    filteredProducts() {
      let filteredProducts = products;

      if (this.filters.priceFrom) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price > this.filterPriceFrom
        );
      }

      if (this.filters.priceTo) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price < this.filterPriceTo
        );
      }

      if (this.filters.categoryId) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoryId === this.filterCategoryId
        );
      }

      if (this.filters.color) {
        let filteredArr = [];

        for (let product of filteredProducts) {
          product.colors.forEach((color) =>
            color.value === this.filters.color
              ? filteredArr.push(product)
              : false
          );
        }

        filteredProducts = filteredArr;
      }

      if (this.filters.memory.length !== 0) {
        let filteredArr = [];

        for (let product of filteredProducts) {
          if (!product.memorySizes) continue;

          product.memorySizes.forEach((memory) => {
            if (this.filters.memory.includes(memory.value)) {
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
  justify-content: space-between;
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
  
