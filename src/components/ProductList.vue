<template>
  <ul class="catalog__list">
    <ProductItem v-for="product in products" :key="product.id" :product="product" />
  </ul>
</template>

<script>
import ProductItem from "./ProductItem";

export default {
  name: "ProductList",
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  components: {
    ProductItem,
  },
};
</script>

<style>
.catalog__list {
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 31%);
  grid-gap: 65px 30px;
  margin: 0 0 70px;
}
</style>