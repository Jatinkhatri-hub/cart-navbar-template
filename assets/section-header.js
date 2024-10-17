// addEventListener('DOMContentLoaded', () => {

//   var navBar = document.querySelector('.nav-bar__container');
//   var lastScrollTop = 0;

//   const navCloseBtn = document.querySelector('.nav-drawer__close-btn');

//   const navOpenBtn = document.querySelector('.nav-drawer__open-btn');

//   const navDrawer = document.querySelector('.nav-bar__menu');
  
//   navCloseBtn.addEventListener('click',() => {
//     navDrawer.classList.remove('open');
//     navDrawer.classList.add('close');
//     console.log('close')
//   })
  
//   navOpenBtn.addEventListener('click', () => {
//     navDrawer.classList.add('open');
//     navDrawer.classList.remove('close');
//     console.log('open');
//   });


//   if(navBar.classList.contains('scroll_up')) {
//     window.addEventListener('scroll', function() {
//       var scrollTop = window.pageXOffset || document.documentElement.scrollTop;
      
//       if (scrollTop > lastScrollTop) {
//         navBar.style.top = '-95px';
//       }
//       else if (scrollTop === 0) {
//        navBar.classList.add('relative-position'); 
//       } 
//       else {
//         navBar.style.top = '0';
//       }
//       lastScrollTop = scrollTop;
    
//     });
//   } else if (navBar.classList.contains('none')) {
//     navBar.style.position = 'absolute';
//   } else {
//     navBar.style.top = '0';
//   }

// });
// export { openCart }
document.addEventListener('DOMContentLoaded', () => {
  
  var navBar = document.querySelector('.nav-bar__container');
  var lastScrollTop = 0;
  
  const navCloseBtn = document.querySelector('.nav-drawer__close-btn');
  const navOpenBtn = document.querySelector('.nav-drawer__open-btn');
  const navDrawer = document.querySelector('.nav-bar__menu');
  const openCart = document.querySelector('.nav-bar__cart-open-btn');
   //const cartDrawer = document.querySelector('.cart-drawer__wrapper');
  
     
  // Poll for the cartDrawer in window
  const checkCartDrawer = setInterval(() => {
    if (window.cartDrawer) {
      // Now cartDrawer is available
      const cartDrawer = window.cartDrawer;
      const cartO
      console.log('Cart drawer found:', cartDrawer);

      // Add event listener to open the cart
      openCart.addEventListener('click', () => {
        cartDrawer.classList.add('cart-drawer--active');
        cartDrawer.classList.remove('close');
        console.log('Cart drawer opened');
      });

      clearInterval(checkCartDrawer); // Stop polling once cartDrawer is found
    } else {
      console.log('Waiting for cart drawer...');
    }
  }, 100); // Check every 100ms

  

  // const cartDrawer = window.cartDrawer;
  // console.log(cartDrawer);

  // openCart.addEventListener('click', () => {
  //   // cartDrawer.classList.add('cart-drawer--active');
  //   // cartDrawer.classList.remove('close');
  //   console.log(cartDrawer);
  // });
  
  navCloseBtn.addEventListener('click', () => {
    navDrawer.classList.remove('open');
    navDrawer.classList.add('close');
    console.log('close');
  });
  
  navOpenBtn.addEventListener('click', () => {
    navDrawer.classList.add('open');
    navDrawer.classList.remove('close');
    console.log('open');
  });

  if (navBar.classList.contains('scroll_up')) {
    window.addEventListener('scroll', function() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > lastScrollTop) {
        navBar.style.top = '-95px';
        navBar.classList.remove('relative-position'); // Remove relative when scrolling down
      } else if (scrollTop === 0) {
        navBar.classList.add('relative-position'); // Add relative at the top
        navBar.style.top = '0';
      } else {
        navBar.style.top = '0';
        navBar.classList.remove('relative-position'); // Ensure it's removed when not at the top
      }
      lastScrollTop = scrollTop;
    });
  } else if (navBar.classList.contains('none')) {
    navBar.style.position = 'absolute';
  } else {
    navBar.style.top = '0';
  }

});


