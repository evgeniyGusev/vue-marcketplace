<template>
  <fragment>
    <h1>Страница не найдена</h1>
    <img src="@/../public/img/page-not-found.png" alt="pageNotFound" />
  </fragment>
</template>

<script>
import Vue from "vue";
import { Plugin } from "vue-fragment";
Vue.use(Plugin);

export default {
  name: "NotFoundPage",
};
</script>

<style scoped>
h1 {
  text-align: center;
}
img {
  display: block;
  margin: 0 auto;
}
</style>