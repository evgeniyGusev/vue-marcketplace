<template>
  <li class="cart__item product">
    <router-link :to="{name: 'product', params: {id: item.productId}}" class="product__pic">
      <img :src="item.product.image" width="120" height="120" :alt="item.product.title" />
    </router-link>
    <div>
      <h3 class="product__title">
        <router-link :to="{name: 'product', params: {id: item.productId}}">{{item.product.title}}</router-link>
      </h3>

      <p class="product__info" v-if="item.memory">
        Объем:
        <span>{{item.memory}} Gb</span>
      </p>
      <p class="product__info product__info--color">
        Цвет:
        <span>
          <i :style="{backgroundColor: item.color}"></i>
        </span>
      </p>
      <span class="product__code">Артикул: {{item.productId}}</span>
    </div>

    <BaseProductCounter
      :amount.sync="amount"
      :maxCount="item.product.inStock"
      class="product__counter form__counter"
    />

    <b class="product__price">{{numberFormat(item.amount * item.product.price)}} ₽</b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click="deleteProduct(item.productId)"
    >&#10060;</button>
  </li>
</template>

<script>
import { mapMutations } from "vuex";
import BaseProductCounter from "@/components/BaseProductCounter";

export default {
  name: "CartItem",
  components: { BaseProductCounter },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.updateAmount({
          productId: this.item.productId,
          amount: value,
        });
      },
    },
  },

  methods: {
    ...mapMutations({
      deleteProduct: "DELETE_CART_PRODUCT",
      updateAmount: "UPDATE_PRODUCT_AMOUNT",
    }),
  },
};
</script>