export function getCart() {
    const value = localStorage.getItem("cart");
    const cart = JSON.parse(value);
    return cart;
  }
  
  export function setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }