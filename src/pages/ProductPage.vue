<template>
  <fragment>
    <main class="content container" v-if="isProductLoading">
      <BaseLoaderSpinner />
    </main>

    <main class="content container" v-else-if="isProductLoadFailed">
      <div>
        Не удалось загрузить товар...
        <button @click="loadProduct">Попробовать снова</button>
      </div>
    </main>

    <main class="content container" v-else>
      <div>
        <div class="content__top">
          <ul class="breadcrumbs">
            <li class="breadcrumbs__item">
              <router-link class="breadcrumbs__link" :to="{ name: 'main' }"
                >Каталог</router-link
              >
            </li>
            <li class="breadcrumbs__item">
              <router-link class="breadcrumbs__link" :to="{ name: 'main' }">{{
                category.title
              }}</router-link>
            </li>
            <li class="breadcrumbs__item">
              <a class="breadcrumbs__link">{{ product.title }}</a>
            </li>
          </ul>
        </div>

        <section class="item">
          <div class="item__pics pics">
            <div class="pics__wrapper">
              <img
                width="570"
                height="570"
                :src="product.image"
                :alt="product.title"
              />
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
            <span class="item__code">Артикул: {{ product.id }}</span>
            <h2 class="item__title">{{ product.title }}</h2>
            <div class="item__form">
              <form class="form" @submit.prevent="addProductToCart">
                <b class="item__price">{{ numberFormat(product.price) }} ₽</b>

                <fieldset class="form__block">
                  <legend class="form__legend">Цвет:</legend>

                  <BaseColorList
                    :colors="product.colors"
                    :colorId.sync="checkedColorId"
                  />
                </fieldset>

                <!-- <fieldset class="form__block" v-if="product.memorySizes">
                <legend class="form__legend">Объемб в ГБ:</legend>
                <ul class="sizes sizes--primery">
                  <li
                    v-for="memory in product.memorySizes"
                    :key="memory.id"
                    class="sizes__item"
                  >
                    <label class="sizes__label">
                      <input
                        type="radio"
                        :value="memory.value"
                        :name="product.id"
                        class="sizes__radio sr-only"
                        v-model="checkedMemory"
                      />
                      <span class="sizes__value">{{
                        memory.value + " gb"
                      }}</span>
                    </label>
                  </li>
                </ul>
              </fieldset> -->

                <div class="item__row">
                  <BaseProductCounter
                    :amount.sync="checkedQuantity"
                    :maxCount="product.inStock"
                    class="form__counter"
                  />

                  <button
                    class="button button--primery"
                    type="submit"
                    :disabled="isProductAddLoading"
                  >
                    {{ buttonText }}
                  </button>

                  <div v-show="isProductAddLoading">Добавляем товар...</div>
                  <div v-show="isProductAddToCart">Товар добавлен</div>
                  <div v-show="isProductAddFailed">
                    Не удалось добавить товар. Повторите попытку
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="item__desc">
            <ul class="tabs">
              <li class="tabs__item" v-for="tab of tabs" :key="tab.id">
                <a
                  :class="[
                    'tabs__link',
                    { 'tabs__link--current': activeTab === tab.tab },
                  ]"
                  href="#"
                  @click.prevent="activeTab = tab.tab"
                  >{{ tab.title }}</a
                >
              </li>
            </ul>

            <div class="item__content">
              <component
                :is="activeTab"
                :product="product"
                @change-tab="(value) => (activeTab = value)"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  </fragment>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import { BASE_API_URL } from "@/config";

import ProductAboutTab from "@/components/productPageComponents/ProductAboutTab";
import ProductSpecTab from "@/components/productPageComponents/ProductSpecTab";
import ProductGuarantTab from "@/components/productPageComponents/ProductGuarantTab";
import ProductDeliveryTab from "@/components/productPageComponents/ProductDeliveryTab";

import BaseProductCounter from "@/components/BaseProductCounter";
import BaseColorList from "@/components/BaseColorList";
import BaseLoaderSpinner from "@/components/BaseLoaderSpinner";

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
      checkedColorId: 0,
      checkedQuantity: 1,

      productData: null,

      isProductLoading: false,
      isProductLoadFailed: false,

      isProductAddLoading: false,
      isProductAddToCart: false,
      isProductAddFailed: false,
    };
  },

  computed: {
    product() {
      return this.productData ? this.productData : {};
    },

    category() {
      return this.productData ? this.productData.category : {};
    },

    tabs() {
      return tabs;
    },

    baseColor() {
      return this.product.colors[0].id;
    },

    buttonText() {
      if (this.isProductAddFailed) {
        return "Еще раз..";
      } else {
        return this.isProductAddLoading ? "Подождите..." : "Добавить";
      }
    },
  },

  methods: {
    ...mapActions({
      addProduct: "addProduct",
    }),

    addProductToCart() {
      this.isProductAddLoading = true;
      this.isProductAddToCart = false;
      this.isProductAddFailed = false;

      setTimeout(() => {
        this.addProduct({
          productId: this.product.id,
          amount: this.checkedQuantity,
          colorId: this.checkedColorId,
        })
          .then(() => {
            this.isProductAddToCart = true;
            this.isProductAddLoading = false;
          })
          .catch(() => (this.isProductAddFailed = true))
          .finally(() => {
            this.isProductAddLoading = false;
            this.isProductAddToCart
              ? setTimeout(() => (this.isProductAddToCart = false), 2000)
              : false;
          });
      }, 5000);
    },

    loadProduct() {
      this.isProductLoading = true;
      this.isProductLoadFailed = false;

      return axios
        .get(BASE_API_URL + "products/" + this.$route.params.id)
        .then(
          (response) =>
            (this.productData = {
              ...response.data,
              image: response.data.image.file.url,
              description: "Здесь должно быть описание",
              specifications: [
                {
                  id: 1,
                  title: "Характеристика",
                  description: "Описание",
                  onAboutTab: true,
                },
              ],
            })
        )
        .catch((error) => {
          if (error.response.status === 404) {
            this.$router.replace({ name: "notFoundPage" });
          } else {
            this.isProductLoadFailed = true;
          }
        })
        .finally(() => (this.isProductLoading = false));
    },
  },

  watch: {
    "$route.params.id": {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },

  components: {
    BaseColorList,
    ProductAboutTab,
    ProductSpecTab,
    ProductGuarantTab,
    ProductDeliveryTab,
    BaseProductCounter,
    BaseLoaderSpinner,
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