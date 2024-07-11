import "./style.css";
import { getCart, setCart } from './util';

function initializeState() {
  const cart = getCart();
  if (cart) {
    document.querySelector(".cart-total-items").innerHTML = cart.items.length;
  }
}

function getCartRow(item){
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>
      <div class="flex items-center gap-3">
        <div class="avatar">
          <div class="mask mask-squircle w-12 h-12">
            <img src="${item.thumbnail}" alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
        <div>
          <div class="font-bold">${item.title}</div>
        </div>
      </div>
    </td>
    <td>$${item.price}</td>
    <td>
      <form class="max-w-xs mx-auto">
        <div class="relative flex items-center max-w-[8rem]">
          <button type="button" id="decrement-button-${item.id}" class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
            <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
            </svg>
          </button>
          <input type="number" id="quantity-input-${item.id}" value="${item.quantity}" class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          <button type="button" id="increment-button-${item.id}" class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
            <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
          </button>
        </div>
      </form>
    </td>
    <td id="total-price-${item.id}">$${(item.price * item.quantity).toFixed(2)}</td>
  `;

  return tr;
}

function updateTotalPrice(itemId, price, quantity) {
  const totalPrice = (price * quantity).toFixed(2);
  document.getElementById(`total-price-${itemId}`).textContent = `$${totalPrice}`;
}

function renderCart(){
  const cart = getCart();
  const cartItemsDiv = document.querySelector('.cart-items');
  cartItemsDiv.innerHTML = "";

  for(let i =  0; i < cart.items.length; ++i){
    const item = cart.items[i];
    const cartRow = getCartRow(item);
    cartItemsDiv.append(cartRow);

    // Add event listeners for increment and decrement buttons
    const decrementButton = document.getElementById(`decrement-button-${item.id}`);
    const incrementButton = document.getElementById(`increment-button-${item.id}`);
    const quantityInput = document.getElementById(`quantity-input-${item.id}`);

    decrementButton.addEventListener('click', () => {
      let currentValue = parseInt(quantityInput.value, 10);
      if (currentValue > 1) {
        currentValue -= 1;
        quantityInput.value = currentValue;
        updateTotalPrice(item.id, item.price, currentValue);
        item.quantity = currentValue;
        setCart(cart); // Save updated cart
      }
    });

    incrementButton.addEventListener('click', () => {
      let currentValue = parseInt(quantityInput.value, 10);
      if (currentValue < 50) {
        currentValue += 1;
        quantityInput.value = currentValue;
        updateTotalPrice(item.id, item.price, currentValue);
        item.quantity = currentValue;
        setCart(cart); // Save updated cart
      }
    });
  }
}

window.addEventListener("load", () => {
  initializeState();
  renderCart();
  console.log("Loaded");
});
