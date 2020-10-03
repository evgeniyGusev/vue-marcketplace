// will be rewritten to Object.asigne() later.

export default {
  install(Vue) {
    Vue.prototype.textConvertToShort = (text, count = 30) => `${text.substr(0, count)}...`
  }
}