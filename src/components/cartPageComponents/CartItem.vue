<template>
  <li class="cart__item product">
    <router-link
      :to="{ name: 'product', params: { id: item.productId } }"
      class="product__pic"
    >
      <img
        :src="item.product.image"
        width="120"
        height="120"
        :alt="item.product.title"
      />
    </router-link>
    <div>
      <h3 class="product__title">{{ item.product.title }}</h3>

      <p class="product__info product__info--color">
        Цвет:
        <span>
          <i :style="{ backgroundColor: item.colorId }"></i>
        </span>
      </p>
      <span class="product__code">Артикул: {{ item.productId }}</span>
    </div>

    <BaseProductCounter
      :amount.sync="amount"
      class="product__counter form__counter"
    />

    <b class="product__price"
      >{{ numberFormat(item.amount * item.product.price) }} ₽</b
    >

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click="deleteProduct(item.productId)"
    >
      {{ isProductDeleteInProccess ? "sd" : "&#10060;" }}
    </button>
  </li>
</template>

<script>
import { mapActions } from "vuex";
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

  data() {
    return {
      isProductDeleteInProccess: false,
      isProductDeleteError: false,
    };
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
    ...mapActions({
      updateAmount: "updateCartProductAmount",
      deleteProductFromCart: "deleteProductFromCart",
    }),

    deleteProduct(item) {
      this.isProductDeleteInProccess = true;
      this.isProductDeleteError = false;

      this.deleteProductFromCart(item)
        .catch(() => {
          this.isProductDeleteError = false;
        })
        .finally(() => {
          this.isProductDeleteInProccess = false;
        });
    },
  },
};
</script>