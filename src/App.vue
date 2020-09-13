<template>
  <div>
    <MainHeader />

    <router-view></router-view>

    <MainFooter />
  </div>
</template>

<script>
import MainHeader from "@/components/mainHeaderComponents/MainHeader";
import MainFooter from "@/components/mainFooterComponents/MainFooter";

export default {
  name: "App",
  components: { MainHeader, MainFooter },
};
</script>