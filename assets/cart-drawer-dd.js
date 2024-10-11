document.addEventListener('DOMContentLoaded', () => {
  
  const cartDrawer = document.querySelector('.cart-drawer__wrapper');
  window.cartDrawer = cartDrawer;
  console.log(cartDrawer);

  const closeBtn = document.querySelector('.cart-close__btn');

  closeBtn.addEventListener('click', () => {
    cartDrawer.classList.remove('cart-drawer--active');
    cartDrawer.classList.add('close');
  });

  document.querySelectorAll('form[action="/cart/add"]').forEach(form => {
    form.addEventListener("submit", async (e) =>  {
      e.preventDefault();

      //submit form with a ajax
      await fetch("/cart/add", {
        method: "post",
        body: new FormData(form),
      });

      cartDrawer.classList.add('cart-drawer--active');
      cartDrawer.classList.remove('close');

    });
  })

  async function updateCartDrawer() {
    const  fetch('/?section_id=cart-drawer-new')
  }

});