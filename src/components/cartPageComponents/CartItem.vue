<template>
  <li class="cart__item product" v-if="!isInPopup">
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
      :class="[
        'product__del',
        'button-del',
        { 'delete-waiting': isProductDeleteInProccess },
      ]"
      type="button"
      aria-label="Удалить товар из корзины"
      :disabled="isProductDeleteInProccess"
      @click="deleteProduct(item.productId)"
    >
      {{ isProductDeleteInProccess ? "&#8635;" : "&#10060;" }}
    </button>
  </li>

  <!-- In popup view -->
  <router-link
    v-else
    tag="li"
    class="cart__item cart__item--popup product"
    :to="{ name: 'product', params: { id: item.productId } }"
  >
    <img
      :src="item.product.image"
      width="40"
      height="40"
      :alt="item.product.title"
    />
    <div class="popup-description">
      <h3 class="product__title product__title--popup">
        {{ textConvertToShort(item.product.title) }}
      </h3>

      <span class="product__code">Артикул: {{ item.productId }}</span>
    </div>
  </router-link>
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
    isInPopup: {
      type: Boolean,
      required: false,
      default: false,
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

    async deleteProduct(item) {
      this.isProductDeleteInProccess = true;
      this.isProductDeleteError = false;

      try {
        await this.deleteProductFromCart(item);
      } catch {
        this.isProductDeleteError = false;
      }

      this.isProductDeleteInProccess = false;
    },
  },
};
</script>

<style scoped>
.popup-description {
  margin-left: 10px;
}
.product__title--popup {
  margin: 0;
  font-size: 14px;
}

.cart__item--popup {
  margin-bottom: 15px;
  cursor: pointer;
  justify-content: flex-start;
}

.delete-waiting {
  cursor: progress;
  animation: around 1s linear infinite;
}
@keyframes around {
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>