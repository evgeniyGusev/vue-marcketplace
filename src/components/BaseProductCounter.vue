<template>
  <div class="form__counter">
    <button
      class="numcontroll-btn"
      type="button"
      aria-label="Убрать один товар"
      @click="currentAmount = currentAmount - 1"
      :disabled="currentAmount === 1"
    >&#8249;</button>

    <input type="text" v-model.number="currentAmount" name="count" />

    <button
      class="numcontroll-btn"
      type="button"
      aria-label="Добавить один товар"
      @click="currentAmount = currentAmount + 1"
      :disabled="currentAmount === maxCount"
    >&#8250;</button>
  </div>
</template>

<script>
export default {
  name: "BaseProductCounter",
  props: {
    amount: {
      type: Number,
      required: true,
    },
    maxCount: {
      type: Number,
    },
  },

  computed: {
    currentAmount: {
      get() {
        return this.amount;
      },
      set(val) {
        this.$emit("update:amount", val);
      },
    },
  },
};
</script>