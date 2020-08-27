<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.image" srcset="img/radio@2x.jpg 2x" :alt="product.title" />
    </a>

    <div class="catalog__info" v-if="product.image !== 'img/not-found.png'">
      <h3 class="catalog__title">
        <a href="#">{{product.title}}</a>
      </h3>
      <span class="catalog__price">{{product.price}}</span>

      <!-- <ul v-if="product.hasOwnProperty('memorySizes')">
        <li v-for="memory in product.memorySizes" :key="memory.id">
          <input type="radio" :value="memory.value" />
          <label for="product-memory">{{memory.value + ' gb'}}</label>
        </li>
      </ul>-->

      <BaseColorList :colors="product.colors" :color-group-name="product.id" :color="baseColor" />
    </div>
  </li>
</template>

<script>
import BaseColorList from "./BaseColorList";

export default {
  name: "ProductItem",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  components: {
    BaseColorList,
  },

  computed: {
    baseColor() {
      let color = this.product.colors.filter((item) => item.checked);

      return color[0].value;
    },
  },
};
</script>

<style>
.catalog__item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-item-align: stretch;
  align-self: stretch;
  justify-content: space-between;
}
.catalog__pic {
  display: block;
  width: 270px;
  margin-bottom: 20px;
}
.catalog__pic img {
  -o-object-fit: cover;
  object-fit: cover;
}
.catalog__info {
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
</style>