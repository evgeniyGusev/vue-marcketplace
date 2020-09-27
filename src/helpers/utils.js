// export const getProductsMemories = (products) => {
//   let filteredArr = new Set();
//   let productsCount = {};

//   for (let product of products) {
//     if (!product.memorySizes) continue;

//     product.memorySizes.forEach((item) => {
//       filteredArr.add(item.value);

//       if (productsCount[item.value]) {
//         productsCount[item.value] = productsCount[item.value] + 1;
//       } else {
//         productsCount[item.value] = 1;
//       }
//     });
//   }

//   return [...filteredArr].map((el, i) => {
//     return {
//       id: i + 1,
//       value: el,
//       checked: false,
//       numOfProducts: productsCount[el],
//     };
//   });
// }

// export const getProductsColors = (products) => {
//   let filteredArr = new Set();

//   for (let product of products) {
//     product.colors.forEach((item) => filteredArr.add(item.value));
//   }

//   return [...filteredArr].map((el, i) => {
//     return { id: i + 1, value: el, checked: false };
//   });
// }