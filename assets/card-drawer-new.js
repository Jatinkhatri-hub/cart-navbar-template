document.addEventListener('DOMContentLoaded', () => {
  const openCart = document.querySelector('.nav-bar__cart-open-btn')
  const cartDrawer = document.querySelector('.cart-drawer__wrapper');


  openCart.addEventListener('click', () => {
    // cartDrawer.classList.add('cart-drawer--active');
    // cartDrawer.classList.remove('close');
    console.log(cartDrawer);
  });
});