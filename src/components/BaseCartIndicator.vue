<template>
  <router-link :to="{name: 'cart'}">
    <slot :count="count"></slot>
  </router-link>
</template>

<script>
export default {
  name: "BaseCartIndicator",

  data() {
    return {
      count: 10,
    };
  },
};
</script>

<style>
</style>