<template>
  <header class="header">
    <div class="header__wrapper container">
      <span class="header__info">Каталог</span>

      <router-link :to="{name: 'main'}">
        <img
          src="img/svg/logo-tech.svg"
          alt="Логотип интернет магазина Технозавррр"
          width="190"
          height="33"
        />
      </router-link>

      <a class="header__tel" href="tel:8 800 600 90 09">8 800 600 90 09</a>

      <!-- 
        We need to get the "count" field from the slot to display the quantity of products.
        Otherwise, it's just a link to the cart
      -->
      <BaseCartIndicator v-slot="{ count }" class="header__cart" aria-label="Корзина с товарами">
        &#128722;
        <span class="header__count" aria-label="Количество товаров">{{ count }}</span>
      </BaseCartIndicator>
    </div>
  </header>
</template>

<script>
import BaseCartIndicator from "@/components/BaseCartIndicator";

export default {
  name: "MainHeader",
  components: { BaseCartIndicator },
};
</script>

<style>
.header {
  background-color: #272727;
}

.header__wrapper {
  display: grid;
  grid-template-columns: 380px 1fr 300px 40px;
  grid-column-gap: 40px;
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: flex-end;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding-top: 23px;
  padding-bottom: 23px;
}

.header__info {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: #fff;
  text-transform: uppercase;
}

.header__logo {
  display: block;
  width: 190px;
  height: 33px;
  margin: 0 auto;
}

.header__tel {
  margin-left: auto;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
}

.header__cart {
  text-align: center;
  font-size: 26px;
  position: relative;
  height: 27px;
  color: #fff;
}

.header__count {
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
</style>