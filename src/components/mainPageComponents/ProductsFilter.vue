<template>
  <section class="filter">
    <div class="filter__head">
      <h2 class="filter__title">Фильтры</h2>
      <button class="filter__show-controll" @click.prevent="openFilters">
        {{ isSmFiltersOpen ? "&#9206;" : "&#9207;" }}
      </button>
    </div>

    <transition name="fade">
      <form
        class="filter__form form"
        action="#"
        method="get"
        @submit.prevent="filterSubmit()"
      >
        <fieldset class="form__block filter__form-block">
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

            <BaseColorList
              :colors="colors"
              :colorId.sync="currentColor"
              v-else
            />
          </fieldset>
        </div>

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
    </transition>
  </section>
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

      isSmFiltersOpen: false,
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

      return axios
        .get(`${BASE_API_URL + apiKey}`)
        .then((response) => (this[dataKey] = response.data))
        .catch(() => (this.isLoadFailed[dataKey] = true));
    },

    openFilters() {
      this.isSmFiltersOpen = !this.isSmFiltersOpen;
    },
  },

  created() {
    this.loadFilterData("categoriesData", "productCategories");
    this.loadFilterData("colorsData", "colors");
  },
};
</script>

<style lang='scss'>
.filter {
  background-color: #444;
  flex-basis: 25%;
  margin-right: 20px;
  max-height: 800px;

  @media screen and (max-width: 1100px) {
    margin-bottom: 20px;
    margin-right: 0;
  }

  &__head {
    @media screen and (max-width: 1100px) {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border-bottom: 1px dashed #fff;
    }
  }

  &__title {
    margin: 0;
    padding: 25px;
    border-bottom: 4px dashed #fff;
    font-family: "PressStart";
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;

    @media screen and (max-width: 1100px) {
      font-size: 14px;
      padding: 0;
      border: none;
    }
  }

  &__show-controll {
    display: none;

    @media screen and (max-width: 1100px) {
      display: block;
      background: none;
      border: 0;
      padding: 2px;
      font-size: 20px;
      line-height: 0;
      color: #fff;
    }
  }

  &__form {
    padding: 35px 25px 60px;

    @media screen and (max-width: 1100px) {
      padding: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
  }

  &__form-block {
    @media screen and (max-width: 1100px) {
      display: flex;
      flex-direction: row;
      flex-basis: 25%;
      margin-bottom: 0;
    }
  }

  &__submit {
    width: 100%;
    margin-bottom: 15px;

    @media screen and (max-width: 1100px) {
      flex-basis: 10%;
      height: 50px;
      padding: 10px;
      margin: 0 10px 0 0;
      align-self: center;
    }
  }

  &__reset {
    width: 144px;

    @media screen and (max-width: 1100px) {
      flex-basis: 10%;
      height: 50px;
      padding: 10px;
      align-self: center;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
    transform: translateY(-50px);
  }
}
</style>