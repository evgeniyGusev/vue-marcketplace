<template >
  <div v-if="isVisible" class="cart-popup">
    <ul>
      <CartItem
        v-for="product in products"
        :key="product.productId"
        :item="product"
        :isInPopup="true"
      />
    </ul>
    <div class="cart-popup__control">
      <router-link :to="{ name: 'cart' }" class="cart-popup__link-to-cart"
        >В корзину</router-link
      >
      <button class="cart-popup__close-btn" @click="closePopup">Закрыть</button>
    </div>
  </div>
</template>

<script>
import CartItem from "@/components/cartPageComponents/CartItem";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CartPopup",

  computed: {
    ...mapGetters({
      isVisible: "cartPopupVisibleStatus",
      products: "detailCartProducts",
    }),
  },

  methods: {
    ...mapMutations({
      closePopup: "CHANGE_CARTPOPUP_VISIBLE",
    }),
  },

  components: { CartItem },
};
</script>

<style scoped>
.cart-popup {
  z-index: 10;
  position: absolute;
  right: 0;
  top: 90px;
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0 5px 2px #000;
}
.cart-popup__control {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid #444;
  padding-top: 10px;
}
.cart-popup__link-to-cart {
  font-size: 14px;
  color: green;
}
.cart-popup__link-to-cart:hover {
  color: #444;
}
.cart-popup__close-btn {
  background-color: orangered;
  color: #fff;
  border: none;
  padding: 3px;
  border-radius: 3px;
  cursor: pointer;
}
</style>