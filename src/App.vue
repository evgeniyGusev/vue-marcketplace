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
import { mapActions, mapMutations } from "vuex";

export default {
  name: "App",
  components: { MainHeader, MainFooter },

  methods: {
    ...mapActions({
      loadCart: "loadCart",
    }),
    ...mapMutations({
      updateUserAccessKey: "UPDATE_USER_ACCESSKEY",
    }),
  },

  created() {
    const userAccessKey = localStorage.getItem("userAccessKey");

    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }

    this.loadCart();
  },
};
</script>