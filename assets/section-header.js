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

document.addEventListener('DOMContentLoaded', () => {

  var navBar = document.querySelector('.nav-bar__container');
  var lastScrollTop = 0;

  const navCloseBtn = document.querySelector('.nav-drawer__close-btn');
  const navOpenBtn = document.querySelector('.nav-drawer__open-btn');
  const navDrawer = document.querySelector('.nav-bar__menu');
  
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


