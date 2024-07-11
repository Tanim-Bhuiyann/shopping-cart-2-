import "./style.css";
import { getCart, setCart } from './util';


async function getProducts() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  console.log(data.products);
  return data.products;
}

/* function getCart() {
  const value = localStorage.getItem("cart");
  const cart = JSON.parse(value);
  return cart;
}

function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
} */

function getProductCard(products, i) {
  const div = document.createElement("div");
  div.innerHTML = `<div class="card card-compact bg-base-100 shadow-xl relative overflow-hidden">
  <div class="h-64 w-full overflow-hidden flex justify-center items-center">
    <img
    src="${products[i].thumbnail}"
      alt=" "
    />
  </div>
  <div
    class="absolute top-0 right-0 bg-primary text-white w-12 h-14 pt-2 text-center font-semibold rounded-tr-2xl rounded-bl-2xl text-sm">
  ${products[i].discountPercentage}%<br> OFF
  </div>
  <div class="card-body">
    <div class="card-title h-5"><h2 >${products[i].title}</h2></div>
<div class="py-1">
  <p>${products[i].description.slice(0, 50)}${products[i].description.length > 50 ? "..." : ""}</p>
</div>

    <p><strong>$${products[i].price}</strong></p>

  </div>
</div>`;

  const buttonDiv = document.createElement("div");
  buttonDiv.className = "card-actions justify-end";
  const button = document.createElement("button");
  button.innerText = "Add to Cart";
  button.className = "btn btn-sm btn-primary ";
  buttonDiv.append(button);

  button.addEventListener("click", () => {
    const cart = getCart();
    const product = products[i];

    const productInCart = cart.items.find((item) => item.id === product.id);
    //console.log(productInCart);

    if (!productInCart) {
      cart.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        thumbnail: product.thumbnail,
        quantity: 1,
      });
    } else {
      cart.items = cart.items.map((item) => {
        if (item.id === product.id) {
          item.quantity = item.quantity + 1;
          return item;
          /* return {
            ...item,
            quantity: item.quantity + 1,
          }; */
        }
        return item;
      });
    }

    document.querySelector(".cart-total-items").innerHTML = cart.items.length;

    setCart(cart);
  });

  div.querySelector(".card-body").appendChild(buttonDiv);

  return div;
}

function initializeState() {
  const cart = getCart();
  if (!cart) {
    const initialCart = {
      items: [],
      discount: 0,
      shipping: 100,
    };
    setCart(initialCart);
  } else {
    document.querySelector(".cart-total-items").innerHTML = cart.items.length;
  }
}

async function renderProducts() {
  const products = await getProducts();
  const productsDiv = document.querySelector(".products");

  initializeState();

  for (let i = 0; i < products.length; ++i) {
    productsDiv.append(getProductCard(products, i));
  }
  
}

window.addEventListener("load", () =>{
  initializeState();
  renderProducts();
});



