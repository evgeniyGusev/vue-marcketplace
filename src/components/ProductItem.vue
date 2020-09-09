<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#" @click.prevent="gotoPage('product', {id: product.id})">
      <img :src="product.image" :alt="product.title" />
    </a>

    <div class="catalog__info">
      <h3 class="catalog__title">
        <a href="#">{{product.title}}</a>
      </h3>
      <span class="catalog__price">{{product.price | formatPrice}}</span>

      <div class="memory-list" v-if="product.memorySizes">
        <span
          class="memory-list__item"
          v-for="memory in product.memorySizes"
          :key="memory.id"
        >{{memory.value}} Gb</span>
      </div>
      <BaseColorList :colors="product.colors" :color.sync="baseColor" />
    </div>
  </li>
</template>

<script>
import BaseColorList from "./BaseColorList";
import gotoPage from "@/helpers/gotoPage";
import numberFormat from "@/helpers/numberFormat";

export default {
  name: "ProductItem",
  props: {
    product: Object,
  },

  components: {
    BaseColorList,
  },

  data() {
    return {
      baseColor: this.product.colors[0].value,
    };
  },

  methods: {
    gotoPage,
  },

  filters: {
    formatPrice(val) {
      return isNaN(val) ? "Информация недоступна" : numberFormat(val);
    },
  },
};
</script>

<style>
.catalog__item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 10px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-item-align: stretch;
  align-self: stretch;
  justify-content: space-between;
  border-radius: 5px;
  background-color: #e6e6e6;
  box-shadow: 0 3px 3px 0 #444;
}
.catalog__pic {
  display: block;
  margin-bottom: 20px;
}
.catalog__pic img {
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: 5px;
}
.catalog__info {
  border-top: 1px solid #222;
  padding-top: 5px;
}
.catalog__title {
  margin: 0 0 10px;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #222;
}
.catalog__title a {
  text-align: center;
  color: #222;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
.catalog__title a:focus,
.catalog__title a:hover {
  opacity: 0.6;
}
.catalog__price {
  display: block;
  margin-bottom: 10px;
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
}
.memory-list {
  margin: 0 0 10px 0;
  padding: 5px 0;
}
.memory-list__item {
  font-weight: 500;
  border: 1px solid #444;
  padding: 3px;
  border-radius: 3px;
}
.memory-list__item:not(:last-child) {
  margin-right: 10px;
}
</style>