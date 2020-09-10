import numberFormat from "@/helpers/numberFormat";

export const formatPrice = {
  filters: {
    formatPrice(val) {
      return isNaN(val) ? "Информация недоступна" : numberFormat(val);
    }
  }
}