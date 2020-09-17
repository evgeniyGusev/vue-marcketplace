<template>
  <router-link :to="{name: 'cart'}">
    <slot :count="count"></slot>
  </router-link>
</template>

<script>
export default {
  name: "BaseCartIndicator",

  computed: {
    count() {
      return this.$store.getters.productsInCartLength;
    },
  },
};
</script>

<style>
</style>