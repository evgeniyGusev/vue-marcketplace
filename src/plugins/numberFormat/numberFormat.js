// Plugin for migration to vue 3
// Filter for number type data in the template

const numberFormat = (value) => {
  return new Intl.NumberFormat().format(value);
}

export default {
  install(Vue) {
    Vue.prototype.numberFormat = numberFormat;
  }
}