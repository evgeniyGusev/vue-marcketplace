<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="filterSubmit()">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom" />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo" />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            type="text"
            name="category"
            v-model.number="currentCategoryId"
          >
            <option value="0">Все категории</option>
            <option
              v-for="category in categories"
              :value="category.id"
              :key="category.id"
            >{{category.title}}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <BaseColorList
          :colors="filterColors"
          :color-group-name="radioGroupName"
          :color.sync="currentColor"
        />
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="memory in filterMemory" :key="memory.id">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                :value="memory.value"
                v-model="currentMemory"
              />
              <span class="check-list__desc">
                {{memory.value}}
                <span>({{getProductsEqualMemory(memory.value)}})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <input class="filter__submit button button--primery" type="submit" value="Применить" />
      <button
        class="filter__reset button button--second"
        type="button"
        @click.prevent="filterClear"
      >Сбросить</button>
    </form>
  </aside>
</template>

<script>
import categories from "../data/categories";
import filterColors from "../data/filterColors";
import filterMemory from "../data/filterMemory";
import products from "../data/products";
import BaseColorList from "./BaseColorList";

export default {
  name: "ProductsFilter",
  props: {
    priceFrom: {
      type: Number,
      required: true,
      default: 0,
    },
    priceTo: {
      type: Number,
      required: true,
      default: 0,
    },
    categoryId: {
      type: Number,
      required: true,
      default: 0,
    },
    color: {
      requred: true,
    },
    memory: {
      type: Array,
      required: true,
    },
  },
  components: { BaseColorList },

  data() {
    return {
      radioGroupName: "filterColors",

      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColor: "",
      currentMemory: [],
    };
  },

  computed: {
    categories() {
      return categories;
    },
    filterColors() {
      return filterColors;
    },
    filterMemory() {
      return filterMemory;
    },
    products() {
      return products;
    },
  },

  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    color(value) {
      this.currentColor = value;
    },
    memory(value) {
      this.currentMemory = value;
    },
  },

  methods: {
    filterSubmit() {
      this.$emit("update:priceFrom", this.currentPriceFrom);
      this.$emit("update:priceTo", this.currentPriceTo);
      this.$emit("update:categoryId", this.currentCategoryId);
      this.$emit("update:color", this.currentColor);
      this.$emit("update:memory", this.currentMemory);
    },
    filterClear() {
      this.$emit("update:priceFrom", 0);
      this.$emit("update:priceTo", 0);
      this.$emit("update:categoryId", 0);
      this.$emit("update:color", "");
      this.$emit("update:memory", []);
    },
    getProductsEqualMemory(val) {
      let filteredNum = 0;

      for (let product of this.products) {
        if (!product.hasOwnProperty("memorySizes")) continue;

        product.memorySizes.forEach((size) => {
          size.value === val ? (filteredNum += 1) : false;
        });
      }

      return filteredNum;
    },
  },
};
</script>

<style>
.filter {
  min-width: 300px;
  width: 300px;
  background-color: #444;
  color: #fff;
}
</style>