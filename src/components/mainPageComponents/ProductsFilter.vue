<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="filterSubmit()"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            v-model.number="currentPriceFrom"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="max-price"
            v-model.number="currentPriceTo"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <div>
        <fieldset class="form__block">
          <legend class="form__legend">Категория</legend>

          <div v-if="isLoadFailed.categoriesData">
            Не удалось загрузить категории <br />
            <button
              @click="loadFilterData('categoriesData', 'productCategories')"
            >
              Попробовать еще раз
            </button>
          </div>

          <label class="form__label form__label--select" v-else>
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
              >
                {{ category.title }}
              </option>
            </select>
          </label>
        </fieldset>

        <fieldset class="form__block">
          <legend class="form__legend">Цвет</legend>
          <div v-if="isLoadFailed.colorsData">
            Не удалось загрузить цвета <br />
            <button @click="loadFilterData('colorsData', 'colors')">
              Попробовать еще раз
            </button>
          </div>

          <BaseColorList :colors="colors" :colorId.sync="currentColor" v-else />
        </fieldset>
      </div>

      <!-- <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li
            class="check-list__item"
            v-for="memory in listOfMemories"
            :key="memory.id"
          >
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                :value="memory.value"
                v-model="currentMemory"
              />
              <span class="check-list__desc">
                {{ memory.value }}
                <span>({{ memory.numOfProducts }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset> -->

      <input
        class="filter__submit button button--primery"
        type="submit"
        value="Применить"
      />
      <button
        class="filter__reset button button--second"
        type="button"
        @click.prevent="filterClear"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import BaseColorList from "@/components/BaseColorList";
import axios from "axios";
import { BASE_API_URL } from "@/config.js";

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
    colorId: {
      type: Number,
      requred: true,
      default: 0,
    },
  },
  components: { BaseColorList },

  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColor: 0,

      categoriesData: null,
      colorsData: null,

      isLoadFailed: {
        categoriesData: false,
        colorsData: false,
      },
    };
  },

  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    },
  },

  methods: {
    filterSubmit() {
      this.$emit("update:priceFrom", this.currentPriceFrom);
      this.$emit("update:priceTo", this.currentPriceTo);
      this.$emit("update:categoryId", this.currentCategoryId);
      this.$emit("update:colorId", this.currentColor);
    },
    filterClear() {
      this.$emit("update:priceFrom", 0);
      this.$emit("update:priceTo", 0);
      this.$emit("update:categoryId", 0);
      this.$emit("update:colorId", 0);

      this.currentPriceFrom = 0;
      this.currentPriceTo = 0;
      this.currentCategoryId = 0;
      this.currentColor = 0;
    },

    loadFilterData(dataKey, apiKey) {
      this.isLoadFailed[dataKey] = false;

      axios
        .get(`${BASE_API_URL + apiKey}`)
        .then((response) => (this[dataKey] = response.data))
        .catch(() => (this.isLoadFailed[dataKey] = true));
    },

    // loadCategories() {
    //   axios
    //     .get(`${BASE_API_URL}productCategories`)
    //     .then((response) => (this.categoriesData = response.data));
    // },

    // loadColors() {
    //   axios
    //     .get(`${BASE_API_URL}colors`)
    //     .then((response) => (this.colorsData = response.data));
    // },
  },

  created() {
    this.loadFilterData("categoriesData", "productCategories");
    this.loadFilterData("colorsData", "colors");
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