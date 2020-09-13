<template>
  <fragment>
    <main class="content container">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{name: 'main'}">Каталог</router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{name: 'main'}">{{category.title}}</router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">{{product.title}}</a>
          </li>
        </ul>
      </div>

      <section class="item">
        <div class="item__pics pics">
          <div class="pics__wrapper">
            <img width="570" height="570" :src="product.image" :alt="product.title" />
          </div>
          <!-- <ul class="pics__list">
          <li class="pics__item">
            <a href class="pics__link pics__link--current">
              <img
                width="98"
                height="98"
                src="img/phone-square-1.jpg"
                srcset="img/phone-square-1@2x.jpg 2x"
                alt="Название товара"
              />
            </a>
          </li>
          <li class="pics__item">
            <a href class="pics__link">
              <img
                width="98"
                height="98"
                src="img/phone-square-2.jpg"
                srcset="img/phone-square-2@2x.jpg 2x"
                alt="Название товара"
              />
            </a>
          </li>
          <li class="pics__item">
            <a href class="pics__link">
              <img
                width="98"
                height="98"
                src="img/phone-square-3.jpg"
                srcset="img/phone-square-3@2x.jpg 2x"
                alt="Название товара"
              />
            </a>
          </li>
          <li class="pics__item">
            <a class="pics__link" href="#">
              <img
                width="98"
                height="98"
                src="img/phone-square-4.jpg"
                srcset="img/phone-square-4@2x.jpg 2x"
                alt="Название товара"
              />
            </a>
          </li>
          </ul>-->
        </div>

        <div class="item__info">
          <span class="item__code">Артикул: {{product.id}}</span>
          <h2 class="item__title">{{product.title}}</h2>
          <div class="item__form">
            <form class="form" action="#" method="POST">
              <b class="item__price">{{numberFormat(product.price)}} ₽</b>

              <fieldset class="form__block">
                <legend class="form__legend">Цвет:</legend>

                <BaseColorList :colors="product.colors" :color.sync="checkedColor" />
              </fieldset>

              <fieldset class="form__block" v-if="product.hasOwnProperty('memorySizes')">
                <legend class="form__legend">Объемб в ГБ:</legend>
                <ul class="sizes sizes--primery">
                  <li v-for="memory in product.memorySizes" :key="memory.id" class="sizes__item">
                    <label class="sizes__label">
                      <input
                        type="radio"
                        :value="memory.value"
                        :name="product.id"
                        class="sizes__radio sr-only"
                        v-model="checkedMemory"
                      />
                      <span class="sizes__value">{{memory.value + ' gb'}}</span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <div class="item__row">
                <div class="form__counter">
                  <button
                    class="numcontroll-btn"
                    type="button"
                    aria-label="Убрать один товар"
                    @click="checkedQuantity = checkedQuantity - 1"
                    :disabled="checkedQuantity === 1"
                  >
                    <svg width="12" height="12" fill="currentColor">
                      <use xlink:href="#icon-minus" />
                    </svg>
                  </button>

                  <input type="text" v-model.number="changedQuantity" name="count" />

                  <button
                    class="numcontroll-btn"
                    type="button"
                    aria-label="Добавить один товар"
                    @click="checkedQuantity = checkedQuantity + 1"
                    :disabled="checkedQuantity === product.inStock"
                  >
                    <svg width="12" height="12" fill="currentColor">
                      <use xlink:href="#icon-plus" />
                    </svg>
                  </button>
                </div>
                <transition name="fade">
                  <BaseValidationError v-show="validationError" />
                </transition>

                <button class="button button--primery" type="submit">В корзину</button>
              </div>
            </form>
          </div>
        </div>

        <div class="item__desc">
          <ul class="tabs">
            <li class="tabs__item" v-for="tab of tabs" :key="tab.id">
              <a
                :class="['tabs__link', {'tabs__link--current': activeTab === tab.tab}]"
                href="#"
                @click.prevent="activeTab = tab.tab"
              >{{tab.title}}</a>
            </li>
          </ul>

          <div class="item__content">
            <component
              :is="activeTab"
              :product="product"
              @change-tab="(value) => activeTab = value"
            />
          </div>
        </div>
      </section>
    </main>
  </fragment>
</template>

<script>
import products from "@/data/products";
import categories from "@/data/categories";

import ProductAboutTab from "@/components/productPageComponents/ProductAboutTab";
import ProductSpecTab from "@/components/productPageComponents/ProductSpecTab";
import ProductGuarantTab from "@/components/productPageComponents/ProductGuarantTab";
import ProductDeliveryTab from "@/components/productPageComponents/ProductDeliveryTab";

import BaseColorList from "@/components/BaseColorList";
import BaseValidationError from "@/components/BaseValidationError";

const tabs = [
  { id: 1, title: "Описание", tab: "ProductAboutTab" },
  { id: 2, title: "Характеристики", tab: "ProductSpecTab" },
  { id: 3, title: "Гарантия", tab: "ProductGuarantTab" },
  { id: 4, title: "Оплата и доставка", tab: "ProductDeliveryTab" },
];

export default {
  name: "ProductPage",

  data() {
    return {
      activeTab: "ProductAboutTab",
      checkedColor: null,
      checkedMemory: null,
      checkedQuantity: 1,
      validationError: false,
    };
  },

  computed: {
    product() {
      return products.find((product) => product.id === +this.$route.params.id);
    },
    category() {
      return categories.find(
        (category) => category.id === this.product.categoryId
      );
    },
    tabs() {
      return tabs;
    },
    baseColor() {
      return this.product.colors[0].value;
    },
    baseMemory() {
      return this.product.memorySizes[0].value;
    },
    changedQuantity: {
      get() {
        return this.checkedQuantity;
      },
      set(value) {
        if (value > this.product.inStock) {
          this.checkedQuantity = this.product.inStock;
          this.validationError = true;
          this.removeValidationError();
        } else if (value <= 0 || isNaN(value)) {
          this.checkedQuantity = 1;
          this.validationError = true;
          this.removeValidationError();
        }
      },
    },
  },

  methods: {
    removeValidationError() {
      setTimeout(() => (this.validationError = false), 3000);
    },
  },

  created() {
    this.checkedColor = this.baseColor;
    this.product.hasOwnProperty("memorySizes")
      ? (this.checkedMemory = this.baseMemory)
      : false;
  },

  components: {
    BaseColorList,
    BaseValidationError,
    ProductAboutTab,
    ProductSpecTab,
    ProductGuarantTab,
    ProductDeliveryTab,
  },
};
</script>

<style>
.numcontroll-btn {
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>