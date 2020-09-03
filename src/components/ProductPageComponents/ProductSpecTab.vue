<template>
  <ul>
    <li v-for="spec of product.specifications" :key="spec.id">
      <h3>{{spec.title}}</h3>
      <p>{{spec.description}}</p>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    product: Object,
  },
};
</script>