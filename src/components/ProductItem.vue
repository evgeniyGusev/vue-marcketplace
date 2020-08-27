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

      <ul v-if="product.hasOwnProperty('memorySizes')" class="memory-list">
        <li v-for="memory in product.memorySizes" :key="memory.id" class="memory-list__item">
          <label class="memory-list__label">
            <input type="radio" :value="memory.value" :name="product.id" class="memory-list__input" />
            <span class="memory-list__text">{{memory.value + ' gb'}}</span>
          </label>
        </li>
      </ul>

      <BaseColorList :colors="product.colors" :color-group-name="product.title" :color="baseColor" />
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
  list-style-type: none;
  margin: 0 0 10px 0;
  padding: 5px 0;
}
.memory-list__item {
  display: inline-block;
}
.memory-list__item:not(:last-child) {
  margin-right: 10px;
}
.memory-list__input {
  display: none;
}
.memory-list__label {
  padding: 3px;
  border: 1px solid #000;
  border-radius: 3px;
  font-weight: 500;
  background-color: #fff;
  position: relative;
  cursor: pointer;
}
.memory-list__text::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 3px;
  border-radius: 3px;
  background-color: #fff;
  opacity: 0;
  transition: all 0.3s;
}
.memory-list__input:checked + .memory-list__text::before {
  background-color: rgb(80, 199, 44);
  opacity: 1;
  transition: all 0.3s;
}
</style>