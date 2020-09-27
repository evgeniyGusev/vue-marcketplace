<template>
  <ul class="colors">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label">
        <input
          v-model="checkedColor"
          class="colors__radio sr-only"
          type="radio"
          :value="color.id"
        />
        <span
          class="colors__value"
          :style="{ backgroundColor: color.code }"
        ></span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  name: "BaseColorList",
  props: {
    colors: {
      type: Array,
      required: true,
    },
    colorId: {
      required: false,
    },
  },

  computed: {
    checkedColor: {
      get() {
        return this.colorId;
      },

      set(val) {
        this.$emit("update:colorId", val);
      },
    },
  },
};
</script>

<style>
.colors {
  margin: 0;
  padding: 0;
  list-style: none;
  /* border-color: #fff; */
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.colors__item:not(:last-child) {
  margin-right: 4px;
}

.colors__label {
  position: relative;
  cursor: pointer;
  display: block;
  border-radius: 50%;
  padding: 3px;
}

.colors__value,
.colors__value::before {
  border-radius: 50%;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.colors__value {
  display: block;
  width: 20px;
  height: 20px;
}

.colors__value::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 26px;
  height: 26px;
  border: 1px solid transparent;
}

.colors__label:focus .colors__value::before,
.colors__label:hover .colors__value::before,
.colors__radio:checked ~ .colors__value::before {
  border-color: var(--border-color);
}

.colors__radio:focus ~ .colors__value::before {
  opacity: 0.7;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}
</style>