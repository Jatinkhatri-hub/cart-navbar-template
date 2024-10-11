import { navOpenBtn } from './section-header.js'; // Adjust the path as per your file structure
document.addEventListener('DOMContentLoaded', () => {
  // const openCart = document.querySelector('.nav-bar__cart-open-btn')
  // const cartDrawer = document.querySelector('.cart-drawer__wrapper');

// Use the button functionality
navOpenBtn.addEventListener('click', () => {
  console.log('Nav drawer opened from cart drawer');
});


  // openCart.addEventListener('click', () => {
  //   // cartDrawer.classList.add('cart-drawer--active');
  //   // cartDrawer.classList.remove('close');
  //   console.log(cartDrawer);
  // });
  // window.cartDrawer = document.querySelector('.cart-drawer__wrapper')
});