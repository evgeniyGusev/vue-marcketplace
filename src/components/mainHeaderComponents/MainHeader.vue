<template>
  <header class="header">
    <div class="header__wrapper container">
      <span class="header__info">Каталог</span>

      <router-link tag="h1" :to="{ name: 'main' }">
        <img
          src="img/svg/logo-tech.svg"
          alt="Логотип интернет магазина Технозавррр"
          class="header__tittle"
        />
      </router-link>

      <div>
        <a class="header__tel" href="tel:8 800 600 90 09">8 800 600 90 09</a>

        <!-- 
        We need to get the "count" field from the slot to display the quantity of products.
        Otherwise, it's just a link to the cart
      -->
        <BaseCartIndicator
          v-slot="{ count }"
          class="header__cart"
          aria-label="Корзина с товарами"
        >
          &#128722;
          <span class="header__count" aria-label="Количество товаров">{{
            count
          }}</span>
        </BaseCartIndicator>
      </div>

      <transition name="fade">
        <CartPopup />
      </transition>
    </div>
  </header>
</template>

<script>
import BaseCartIndicator from "@/components/BaseCartIndicator";
import CartPopup from "@/components/cartPageComponents/CartPopup";

export default {
  name: "MainHeader",
  components: { BaseCartIndicator, CartPopup },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #272727;

  &__wrapper {
    position: relative;
    padding: 23px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media screen and (max-width: 1280px) {
      padding: 15px;
    }
    @media screen and (max-width: 640px) {
      padding: 10px;
    }
  }

  &__tittle {
    width: 185px;
    height: auto;
    cursor: pointer;
    transition: all 0.25s;
    opacity: 0.6;

    &:hover {
      transform: scale(1.05);
      opacity: 1;
    }

    @media screen and (max-width: 640px) {
      width: 160px;
      height: auto;
    }
    @media screen and (max-width: 420px) {
      width: 130px;
      height: auto;
    }
  }

  &__info {
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: #fff;
    text-transform: uppercase;
    align-self: center;

    @media screen and (max-width: 1280px) {
      display: none;
    }
  }

  &__tel {
    font-size: 14px;
    font-weight: 500;
    color: #fff;

    @media screen and (max-width: 1280px) {
      font-size: 10px;
      font-weight: 400;
    }
  }

  &__cart {
    text-align: center;
    font-size: 26px;
    position: relative;
    color: #fff;
    margin-left: 15px;

    @media screen and (max-width: 640px) {
      margin-left: 7px;
    }
  }

  &__count {
    position: absolute;
    top: -5px;
    right: -3px;
    background-color: #9eff00;
    padding: 3px;
    font-family: "PressStart";
    font-size: 7px;
    line-height: 1;
    color: #222;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>