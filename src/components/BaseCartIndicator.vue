<template>
  <router-link :to="{name: 'cart'}">
    <slot :count="count"></slot>
  </router-link>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BaseCartIndicator",

  computed: {
    ...mapGetters({
      count: "productsInCartLength",
    }),
  },
};
</script>

<style>
</style>