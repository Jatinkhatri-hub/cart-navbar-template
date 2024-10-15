document.addEventListener('DOMContentLoaded', () => {
  
  const cartDrawer = document.querySelector('.cart-drawer__wrapper');
  window.cartDrawer = cartDrawer;
  console.log(cartDrawer);

  
  function closeCart() {
    const closeBtn = document.querySelector('.cart-close__btn');
    closeBtn.addEventListener('click', () => {
      cartDrawer.classList.remove('cart-drawer--active');
      cartDrawer.classList.add('close');
    });
  }

  


  async function updateCartDrawer() {
    const res = await fetch('/?section_id=cart-drawer-new');
    const text = await res.text()
    
    const html = document.createElement('div');
    html.innerHTML = text;
    
    const newBox = html.querySelector(".cart-drawer__wrapper").innerHTML;

    document.querySelector(".cart-drawer__box").innerHTML = newBox

    
    addCartDrawerListners();
    console.log(html);

  }
  function addCartDrawerListners() {


    document.querySelectorAll('.line-item__quantity-selector button').forEach(button => {

      button.addEventListener('click' , (e) =>{
        e.preventDefault();
        ge
        const parentEl  =  button.parentElement;
        console.log(parentEl);

      })

    });

    closeCart();

  

  }

  addCartDrawerListners();


  document.querySelectorAll('form[action="/cart/add"]').forEach(form => {
    form.addEventListener("submit", async (e) =>  {
      e.preventDefault();

      //submit form with a ajax
      await fetch("/cart/add", {
        method: "post",
        body: new FormData(form),
      });

      // Update cart drawer
      await updateCartDrawer();

      cartDrawer.classList.add('cart-drawer--active');
      cartDrawer.classList.remove('close');
      
      addCartDrawerListners();

    });
  })

  

});