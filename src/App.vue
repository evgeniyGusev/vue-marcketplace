<template>
  <section class="catalog">
    <ProductsFilter
      :price-from.sync="filterPriceFrom"
      :price-to.sync="filterPriceTo"
      :category-id.sync="filterCategoryId"
      :color.sync="filterColor"
      :memory.sync="filterMemory"
    />
    <main class="catalog__main">
      <h2 v-if="filteredProducts.length === 0">Товар не найден</h2>
      <ProductList :products="products" />
      <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
    </main>
  </section>
</template>

<script>
import products from "./data/products";
import ProductList from "./components/ProductList";
import BasePagination from "./components/BasePagination";
import ProductsFilter from "./components/ProductsFilter";

export default {
  name: "App",
  components: { ProductsFilter, ProductList, BasePagination },

  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: "",
      filterMemory: [],

      page: 1,
      productsPerPage: 3,
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
</style>


