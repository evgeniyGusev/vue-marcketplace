<template>
  <main class="content container" v-if="isProductLoading">
    <BaseLoaderSpinner />
  </main>

  <main class="content container" v-else-if="isProductLoadFailed">
    <div>
      Не удалось загрузить товар...
      <button @click="loadProduct">Попробовать снова</button>
    </div>
  </main>

  <main class="container" v-else>
    <div>
      <div class="content__head">
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
                  class="button button--primery button--add"
                  type="submit"
                  :disabled="isProductAddLoading"
                >
                  {{ buttonText }}
                </button>

                <transition name="fade">
                  <span
                    :class="[
                      'info-message',
                      {
                        'info-message--err': isProductAddFailed,
                        'info-message--warn': isProductAddLoading,
                        'info-message--ok': isProductAddToCart,
                      },
                    ]"
                    v-show="isPopupCanBeShow"
                  >
                    {{ infoMessageText }}
                  </span>
                </transition>
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
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

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

    infoMessageText() {
      if (this.isProductAddFailed) {
        return "Не удалсь добавить товар, повторите попытку";
      } else {
        return this.isProductAddLoading
          ? "Добавляем товар..."
          : "Товар успешно добавлен";
      }
    },

    isPopupCanBeShow() {
      return (
        this.isProductAddFailed ||
        this.isProductAddLoading ||
        this.isProductAddToCart
      );
    },
  },

  methods: {
    ...mapActions({
      addProduct: "addProduct",
    }),

    async addProductToCart() {
      this.isProductAddLoading = true;
      this.isProductAddToCart = false;
      this.isProductAddFailed = false;

      try {
        await this.addProduct({
          productId: this.product.id,
          amount: this.checkedQuantity,
          colorId: this.checkedColorId,
        });

        this.isProductAddToCart = true;
        this.isProductAddLoading = false;
      } catch {
        this.isProductAddFailed = true;
      }

      this.isProductAddLoading = false;
      this.isProductAddToCart
        ? setTimeout(() => (this.isProductAddToCart = false), 2000)
        : false;
    },

    loadProduct() {
      this.isProductLoading = true;
      this.isProductLoadFailed = false;

      return axios
        .get("products/" + this.$route.params.id)
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
.button--add {
  padding: 20px 70px;
}

.info-message {
  padding: 10px;
  max-width: 300px;
  position: absolute;
  right: 0;
  top: -70px;
  border-radius: 5px;
  letter-spacing: 1px;

  color: #fff;
  font-weight: 700;
}
.info-message--err {
  background-color: #e63127;
}
.info-message--warn {
  background-color: #fcba03;
}
.info-message--ok {
  background-color: #1aab62;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>