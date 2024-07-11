import "./style.css";
import { getCart, setCart } from './util';


function initializeState() {
  const cart = getCart();
  if (cart) {
    document.querySelector(".cart-total-items").innerHTML = cart.items.length;
  }
}

function getCartRow(cartItem){
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>
  <div class="flex items-center gap-3">
    <div class="avatar">
      <div class="mask mask-squircle w-12 h-12">
        <img
          src="${cartItem.thumbnail}"
          alt="Avatar Tailwind CSS Component"
        />
      </div>
    </div>
    <div>
      <div class="font-bold">${cartItem.title}</div>
      <!-- <div class="text-sm opacity-50">United States</div> -->
    </div>
  </div>
</td>
<td>$${cartItem.price}</td>
<td>
  <input
    type="number"
    placeholder="Type here"
    value="${cartItem.quantity}"
    min="0",
    class="quantity-input input input-bordered w-20 max-w-xs" 
  />
</td>
<td>$${(cartItem.price * cartItem.quantity).toFixed(2)}</td>
`;

const input = tr.querySelector(".quantity-input");
input.addEventListener("input", (e) =>{
  const newQunatity = e.target.valueAsNumber;
  if(Number.isInteger(newQunatity) && newQunatity >= 0){
    //console.log(newQunatity);
    const cart = getCart();
    cart.items = cart.items.map((item) =>{
      if(cartItem.id !== item.id) return item;
      item.quantity = newQunatity;
      return item;
    });
    setCart(cart);
    renderCart();
    renderSubtotal();
  }
 

});



return tr;
}

function renderSubtotal(){
const cart = getCart();
const subTotalDiv = document.querySelector('.sub-total');
const TotalDiv = document.querySelector('.total');
//subTotalDiv.innertext = 10;
let subTotal= 0;
for(let i =  0; i < cart.items.length; ++i){
  const item = cart.items[i];
   subTotal += item.price * item.quantity;

}
subTotalDiv.innerText= '$' + subTotal.toFixed(2);
TotalDiv.innerText= '$' + subTotal.toFixed(2);
//console.log(subTotal);
};

function renderCart(){
    const cart = getCart();
    const cartItemsDiv = document.querySelector('.cart-items');
    cartItemsDiv.innerHTML = "";

    for(let i =  0; i < cart.items.length; ++i){
       const item = cart.items[i];
        cartItemsDiv.append(getCartRow(item));
    }

}

window.addEventListener("load", () => {
  initializeState();
  renderCart();
  renderSubtotal();
 
   console.log("Loaded");
});



