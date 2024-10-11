document.addEventListener('DOMContentLoaded', () => {
  
  const cartDrawer = document.querySelector('.cart-drawer__wrapper');
  window.cartDrawer = cartDrawer;
  console.log(cartDrawer);

  const closeBtn = document.querySelector('.cart-close__btn');

  closeBtn.addEventListener('click', () => {
    cartDrawer.classList.remove('cart-drawer--active');
    cartDrawer.classList.add('close');
  });

  document.querySelectorAll('')

});