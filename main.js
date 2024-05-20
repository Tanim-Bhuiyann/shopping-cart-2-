import "./style.css";

async function getProducts() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  console.log(data.products);
  return data.products;
}

// function getProductCard(products, i) {
//   const div = document.createElement("div");
//   div.innerHTML = `<div class="card card-compact bg-base-100 shadow-xl relative overflow-hidden">
//   <div class="h-32 w-full overflow-hidden">
//     <img
//     src="${products[i].thumbnail}"
//       alt="iPhone 9"
//     />
//   </div>
//   <div
//     class="absolute top-0 right-0 bg-primary text-white w-12 h-14 pt-2 text-center font-semibold rounded-tr-2xl rounded-bl-2xl text-sm"
//   >
//   ${products[i].discountPercentage}% OFF
//   </div>
//   <div class="card-body">
//     <h2 class="card-title">${products[i].title}</h2>
//     <p>${products[i].description}</p>
//     <p><strong>$${products[i].price}</strong></p>
//     <div class="card-actions justify-end">
//       <button class="btn btn-sm btn-primary">Add to Cart</button>
//     </div>
//   </div>
// </div>`;

//   return div;
// }

function getProductCard(products, i) {
  const div = document.createElement("div");
  div.innerHTML = `<div class="card card-compact bg-base-100 shadow-xl relative overflow-hidden">
  <div class="h-32 w-full overflow-hidden">
    <img
    src="${products[i].thumbnail}"
      alt="iPhone 9"
    />
  </div>
  <div
    class="absolute top-0 right-0 bg-primary text-white w-12 h-14 pt-2 text-center font-semibold rounded-tr-2xl rounded-bl-2xl text-sm"
  >
  ${products[i].discountPercentage}% OFF
  </div>
  <div class="card-body">
    <h2 class="card-title">${products[i].title}</h2>
    <p>${products[i].description.slice(0, 40)}${products[i].description.length > 40 ? '...' : ''}</p>
    <p><strong>$${products[i].price}</strong></p>
    <div class="card-actions justify-end">
      <button class="btn btn-sm btn-primary">Add to Cart</button>
    </div>
  </div>
</div>`;

  return div;
}

async function renderProducts() {
  const products = await getProducts();
  const productsDiv = document.querySelector(".products");

  for (let i = 0; i < products.length; ++i) {
    productsDiv.append(getProductCard(products, i));
  }
  console.log(productsDiv);
}

renderProducts();

{
  /* <div class="card card-compact bg-base-100 shadow-xl relative">
  <figure>
    <img
      src="${product.thumbnail}"
      alt="iPhone 9"
    />
  </figure>
  <div class="absolute top-0 right-0 bg-primary text-white w-12 h-14 pt-2 text-center font-semibold rounded-tr-2xl rounded-bl-2xl text-sm">
    ${product.discountPercentage}% OFF
  </div>
  <div class="card-body">
    <h2 class="card-title"> ${product.title}</h2>
    <p> ${product.description}</p>
    <p>
      <strong>$${product.price}</strong>
    </p>
    <div class="card-actions justify-end">
      <button class="btn btn-sm btn-primary">Add to Cart</button>
    </div>
  </div>
</div>; */
}
