<template>
  <fragment>
    <ul class="spec-list">
      <li
        class="spec-list__element"
        v-for="spec of filteredSpecifications"
        :key="spec.id"
      >
        {{ spec.title }}
      </li>
    </ul>

    <a href="#" @click.prevent="$emit('change-tab', 'ProductSpecTab')"
      >Все характеристики</a
    >

    <h3>Что это?</h3>

    <p>{{ product.description }}</p>
  </fragment>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  computed: {
    filteredSpecifications() {
      return this.product.specifications.filter((spec) => spec.onAboutTab);
    },
  },
};
</script>

<style >
.spec-list {
  margin-bottom: 20px;
}
.spec-list__element {
  line-height: 28px;
  color: #222;
}
</style>