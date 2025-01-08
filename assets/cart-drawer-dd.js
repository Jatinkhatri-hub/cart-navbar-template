
// document.addEventListener("DOMContentLoaded", () => {
//   const cartDrawer = document.querySelector(".cart-drawer__wrapper");
//   window.cartDrawer = cartDrawer;

//   const cartOverlay = document.querySelector('.cart-overlay');
//   window.cartOverlay = cartOverlay;
//   const freeShippingThreshold = 75.00;

//   document.querySelector('form').addEventListener('submit', function(e) {
//     e.preventDefault();
//   });

//   let mySwiper;

// function initializeSwiper() {
//   mySwiper = new Swiper('.swiper', {
//     // your Swiper configuration
//     slidesPerView: 'auto',
//     spaceBetween: 10,
//     pagination: {
//       el: ".swiper-pagination",
//       type: "progressbar",
//     },
//     // other Swiper settings
//   });
// }

// // Call this function when the page loads initially
// initializeSwiper();

//   // Function to close the cart drawer
//   function closeCart() {
//     const closeBtn = document.querySelector(".cart-close__btn");

//     closeBtn?.addEventListener("click", () => {
//       cartDrawer.classList.remove("cart-drawer--active");
//       cartDrawer.classList.add("close");
//       cartOverlay.classList.remove('is-visible');
//       document.body.style.overflow = '';  // Enable page scroll
//     });

//     cartOverlay.addEventListener("click", () => {
//       cartDrawer.classList.remove("cart-drawer--active");
//       cartDrawer.classList.add("close");
//       cartOverlay.classList.remove('is-visible');
//       document.body.style.overflow = '';  // Enable page scroll
//     })
//   }

//   function toggleSubscriptionDropdown(lineIndex, showDropdown) {
//     const dropdown = document.querySelector(`.subscription-dropdown[data-line="${lineIndex}"]`);
//     if (dropdown) {
//       dropdown.style.display = showDropdown ? 'block' : 'none';
//     }
//   }

//   // Show spinner over a line item
//   function showSpinner(lineItem) {
//     const spinner = document.createElement("div");
//     spinner.classList.add("line-item-spinner");
//     spinner.innerHTML = `<div class="spinner"></div>`; // Customize your spinner HTML
//     lineItem.style.position = "relative";
//     lineItem.appendChild(spinner);
//   }

//   // Hide spinner from a line item
//   function hideSpinner(lineItem) {
//     const spinner = lineItem.querySelector(".line-item-spinner");
//     if (spinner) {
//       spinner.remove();
//     }
//   }

//   function updateShippingProgress() {
//     const progressBar = document.querySelector('.cart-shipping__progress-bar');
//     const progressText = document.querySelector('.cart-shipping__progress-text');
//     const freeShipping = document.querySelector('.cart-drawer__footer-row.shipping');
//     const emptyCart = document.querySelector('.cart-drawer__empty');
//     const cartDrawer = document.querySelector('.cart-drawer__items');
    
//     // Get cart total from Shopify
//     fetch('/cart.js')
//       .then(response => response.json())
//       .then(cart => {
//         const cartTotal = cart.total_price / 100; // Convert cents to dollars
//         const remaining = Math.max(0, freeShippingThreshold - cartTotal);
//         const progress = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
//         cart.items.forEach((item) => {
//             if (item.line_level_discount_allocations.length > 0) {
//                 console.log(
//                     `Discount applied to ${item.title}:`,
//                     item.line_level_discount_allocations
//                 );
//             }
//         });
//         // // Ensure cart.discount_applications exists and is an array
//         // if (Array.isArray(cart.discount_applications)) {
//         //     const freeShipping = cart.discount_applications.find(
//         //         (discount) => discount.type === 'shipping'
//         //     );

//         //     if (freeShipping) {
//         //         console.log('Free shipping applied:', freeShipping);
//         //     } else {
//         //         console.log('No free shipping detected');
//         //     }
//         // } else {
//         //     console.log('No discount applications found', cart);
//         // }

//         if(cart.item_count > 0) {
//           cartDrawer.style.display = "flex";
//           emptyCart.style.display = "none";
//         } else {
//           cartDrawer.style.display = "none";
//           emptyCart.style.display = "flex";
//         }
        
//         // Update progress bar width
//         progressBar.style.width = `${progress}%`;
        
//         // Update text message
//         if (remaining > 0) {
//          // progressText.style.color = 'white';
//           progressText.innerHTML = `Add <strong> $${remaining.toFixed(2)} </strong> more to get Free Shipping!`;
//         } else {
//           progressText.textContent = "You've got Free Shipping! 🎉";
//           freeShipping.innerHTML = `
//             <h3>Shipping</h3>
//             <span>FREE</span>
//           `
//         }
//       })
//       .catch(error => console.error('Error fetching cart:', error));
//   }

//   // Checkbox logic for subscription
//   function addSubscriptionListeners() {
//     document.querySelectorAll('.subscription-checkbox').forEach(checkbox => {
//       checkbox.addEventListener('change', (e) => {
//         const lineIndex = e.target.getAttribute('data-line');
//         const isChecked = e.target.checked;
//         const lineItem = e.target.closest('.line-item'); 

//         showSpinner(lineItem);

//         // Show dropdown when checkbox is checked
//         toggleSubscriptionDropdown(lineIndex, isChecked);

//         // Simulate fetch delay for spinner (you should remove this in actual implementation)
//         setTimeout(() => {
//           hideSpinner(lineItem); // Hide the spinner after the operation
//         }, 1000); // Remove after testing
//       });
//     });

//     // Info circle to toggle dropdown on click
//     document.querySelectorAll('.info-circle').forEach(infoCircle => {
//       infoCircle.addEventListener('click', (e) => {
//         const parent = e.target.closest('.subscription-options');
//         const checkbox = parent.querySelector('.subscription-checkbox');
//         const lineIndex = checkbox.getAttribute('data-line');
//         const lineItem = e.target.closest('.line-item');

//         // Show the dropdown
//         toggleSubscriptionDropdown(lineIndex, true);

//         // Show spinner while updating (if needed)
//         showSpinner(lineItem);
//         setTimeout(() => {
//           hideSpinner(lineItem); // Remove after testing
//         }, 1000);

//       });
//     });
//   }

  

  

//   // Update subscription status for all items in the cart
//   function updateSubscriptionStatus() {
//     document.querySelectorAll('.selling-plan-selector').forEach(selector => {
//       const lineIndex = selector.getAttribute('data-line');
//       const hasSubscription = selector.value !== '';
//       const checkbox = document.querySelector(`.subscription-checkbox[data-line="${lineIndex}"]`);

      
      

//       checkbox.checked = hasSubscription;

//       toggleSubscriptionDropdown(lineIndex, false);


//       // Show or hide dropdown based on subscription
//       // if (hasSubscription) {
//       //   toggleSubscriptionDropdown(lineIndex, true);
//       // }
//     });
//   }



//   function updateOfferButtons(cart) {
//     const cartTotal = cart.total_price / 100; // Shopify returns total_price in cents
//     const offerProductIds = [...document.querySelectorAll('.claim-offer__btn')].map(btn => btn.getAttribute('data-product-id'));
  
//     // Check if any offer product is in the cart
//     const claimedOffer = cart.items.find(item => offerProductIds.includes(item.id.toString()));
  
//     // Update button states based on claimed offer status and min-value comparison
//     document.querySelectorAll('.claim-offer__btn').forEach(button => {
//       const productId = button.getAttribute('data-product-id');
//       const offerProductCard = button.closest('.offer__product-card'); // Assuming each button is inside a product card element
//       const minTotal = parseFloat(offerProductCard.getAttribute('data-min-value')); // Get min value from the product card
  
//       if (claimedOffer && claimedOffer.id.toString() !== productId) {
//         // Disable other buttons if an offer has been claimed
//         button.disabled = true;
//         button.classList.add('claim-offer__btn--disabled');
//         button.textContent = "Offer Already Claimed";
//       } else if (!claimedOffer) {
//         // If no offer has been claimed, check if the cart total meets the required minimum value
//         if (cartTotal >= minTotal) {
//           // Enable the button if cart total is sufficient
//           button.disabled = false;
//           button.classList.remove('claim-offer__btn--disabled');
//           button.textContent = "Claim Offer";
//         } else {
//           // Disable the button if the cart total is less than the required minimum value
//           button.disabled = true;
//           button.classList.add('claim-offer__btn--disabled');
//           button.textContent = `Add $${(minTotal - cartTotal).toFixed(2)} more to claim`;
//         }
//       } else if (claimedOffer.id.toString() === productId) {
//         // Mark the claimed button as "Offer Claimed"
//         button.disabled = true;
//         button.classList.add('claim-offer__btn--disabled');
//         button.textContent = "Offer Claimed";
//       }
//     });
//   }
  


//   // Handle changes in selling plan
//   function updateSellingPlan() {
//     const sellingPlanSelectors = document.querySelectorAll('[name="selling-plan"]');

//     sellingPlanSelectors.forEach(function (element) {
//       element.addEventListener("change", async (event) => {
//         const lineItem = event.target.closest('.line-item');
//         const lineIndex = event.target.getAttribute('data-line');
//         const data = {
//           line: event.target.dataset.line,
//           quantity: event.target.dataset.quantity,
//           id: event.target.value,
//         };

//         // Show loading spinner
//         showSpinner(lineItem);


//         try {
//           const response = await fetch("/cart/change.js", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               line: data.line,
//               quantity: data.quantity,
//               selling_plan: data.id,
//             }),
//           });

//           if (!response.ok) {
//             throw new Error('Selling plan update failed');
//           }

//           // Refresh cart drawer
//           await updateCartDrawer();
//           toggleSubscriptionDropdown(lineIndex, false);
//         } catch (error) {
//           console.error("Error updating selling plan:", error);
//         } finally {
//           // Hide spinner after request is completed
//           hideSpinner(lineItem);
//         }
//       });
//     });
//   }


//   // Update the cart drawer
// async function updateCartDrawer() {
//   const productOffersWrapper = document.querySelector(".product-offers__wrapper");
//   const savedOffersContent = productOffersWrapper ? productOffersWrapper.innerHTML : '';
//   const paymentProvider = document.querySelector('.cart-drawer__payment-provider-img');
//   const savePaymentProvider = paymentProvider ? paymentProvider.innerHTML : '';

//   console.log(paymentProvider);
//   console.log('s', savePaymentProvider);
  
//   const res = await fetch("/?section_id=cart-drawer-new");
//   const text = await res.text();

//   const html = document.createElement("div");
//   html.innerHTML = text;

//   const newBox = html.querySelector(".cart-drawer__wrapper").innerHTML;
//   document.querySelector(".cart-drawer__box").innerHTML = newBox;

//   if (document.querySelector(".product-offers__wrapper")) {
//     document.querySelector(".product-offers__wrapper").innerHTML = savedOffersContent;
//   }

//   if(document.querySelector('.cart-drawer__payment-provider-img')) {
//     document.querySelector('.cart-drawer__payment-provider-img').innerHTML = savePaymentProvider;
//   }

//   try {
//     const cartResponse = await fetch('/cart.js');
//     const cartData = await cartResponse.json();
//     updateOfferButtons(cartData); // Update offer buttons with the latest cart data
//   } catch (error) {
//     console.error('Error fetching cart data:', error);
//   }
  
//   updateShippingProgress();
//   // Reapply event listeners
//   addCartDrawerListeners();
//   initializeSwiper();
// }

//   // Quantity change event listener
//   function addCartDrawerListeners() {
//     document.querySelectorAll(".line-item__quantity-selector button").forEach((button) => {
//       button.addEventListener("click", async (e) => {
//         e.preventDefault();

//         const lineItem = e.target.closest('.line-item');
//         const parentEl = button.closest("[data-line-item-key]");
//         const key = parentEl.getAttribute("data-line-item-key");
//         const currentQuantity = Number(button.parentElement.querySelector("input").value);
//         const isUp = button.classList.contains("line-item__quantity-selector-plus");

//         const newQuantity = isUp ? currentQuantity + 1 : currentQuantity - 1;
//       //  if (newQuantity < 1) return;

//         // Show spinner over the line item
//         showSpinner(lineItem);

//         try {
//           await fetch("/cart/update.js", {
//             method: "post",
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ updates: { [key]: newQuantity } }),
//           });

//           // Update cart drawer
//           await updateCartDrawer();
//         } catch (error) {
//           console.error("Error updating quantity:", error);
//         } finally {
//           // Hide spinner after the request completes
//           hideSpinner(lineItem);
//         }
//       });

//       document.querySelectorAll('.claim-offer__btn').forEach(button => {
//         button.addEventListener('click', async function (event) {
//           event.preventDefault(); // Prevent the default button behavior
      
//           const productId = this.getAttribute('data-product-id');
      
//           try {
//             const response = await fetch('/cart/add.js', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//                 'X-Requested-With': 'XMLHttpRequest'
//               },
//               body: JSON.stringify({
//                 id: productId,
//                 quantity: 1
//               })
//             });
      
//             if (!response.ok) throw new Error("Failed to add offer product to cart");
      
//             this.disabled = true; // Disable the button after claiming the offer
//             this.textContent = 'Offer Claimed';
      
//             // Update the cart drawer and offer buttons
//             await updateCartDrawer();
      
//           } catch (error) {
//             console.error('Error adding product to cart:', error);
//           }
//         });
//       });

//       document.querySelectorAll('.line-item__remove').forEach(button => {
//         button.addEventListener('click', async function (event) {
//           event.preventDefault(); // Prevent redirect to cart page
//           const lineItem = event.target.closest('.line-item');
//           const key = lineItem.getAttribute("data-line-item-key");
    
//           // Show spinner over the line item
//           showSpinner(lineItem);
    
//           try {
//             // Remove the item by setting its quantity to 0
//             await fetch("/cart/update.js", {
//               method: "post",
//               headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ updates: { [key]: 0 } }),
//             });
    
//             // Update cart drawer after removal
//             await updateCartDrawer();
//           } catch (error) {
//             console.error("Error removing item:", error);
//           } finally {
//             hideSpinner(lineItem);
//           }
//         });
//       });

//     });

    

//     closeCart();
//     updateSellingPlan();
//     addSubscriptionListeners(); // Reapply subscription listeners here
//   }

//   //

//   // AJAX form submission for adding to the cart
//   document.querySelectorAll('form[action="/cart/add"]').forEach((form) => {
//     form.addEventListener("submit", async (e) => {
//       e.preventDefault();
//       const productOffersWrapper = document.querySelector(".product-offers__wrapper");
//       const savedOffersContent = productOffersWrapper ? productOffersWrapper.innerHTML : '';


//       try {
//         const response = await fetch("/cart/add", {
//           method: "post",
//           body: new FormData(form),
//         });

//         if (!response.ok) throw new Error("Failed to add item to cart");

//         if (productOffersWrapper) {
//           productOffersWrapper.innerHTML = savedOffersContent;
//         }

//         await updateCartDrawer();
//         cartDrawer.classList.add("cart-drawer--active");
//         cartDrawer.classList.remove("close");
//         cartOverlay.classList.add('is-visible');
//       } catch (error) {
//         console.error("Error adding to cart:", error);
//       }
//     });
//   });

//   // Initialize listeners
//   addCartDrawerListeners();
//   updateSubscriptionStatus();
//   updateShippingProgress();

//   const claimOfferButtons = document.querySelectorAll(".claim-offer__btn");


//   fetch('/cart.js')
//     .then(response => response.json())
//     .then(cart => {
//       console.log('Cart object:', cart);  // Add this line for debugging
//       updateOfferButtons(cart);
//     })
//     .catch(error => console.error('Error fetching cart data:', error));

  

  
// });
// document.addEventListener("DOMContentLoaded", () => {
//   // Cache DOM elements
//   const elements = {
//     cartDrawer: document.querySelector(".cart-drawer__wrapper"),
//     cartOverlay: document.querySelector('.cart-overlay'),
//     cartBox: document.querySelector(".cart-drawer__box"),
//     form: document.querySelector('form'),
//     progressBar: document.querySelector('.cart-shipping__progress-bar'),
//     progressText: document.querySelector('.cart-shipping__progress-text'),
//     freeShipping: document.querySelector('.cart-drawer__footer-row.shipping'),
//     emptyCart: document.querySelector('.cart-drawer__empty'),
//     cartItems: document.querySelector('.cart-drawer__items')
//   };

//   const CONSTANTS = {
//     FREE_SHIPPING_THRESHOLD: 75.00,
//     SPINNER_DELAY: 1000,
//     CART_ENDPOINTS: {
//       get: '/cart.js',
//       update: '/cart/update.js',
//       add: '/cart/add.js',
//       change: '/cart/change.js'
//     }
//   };

//   let mySwiper = null;

//   // Debounce function to limit API calls
//   const debounce = (func, wait) => {
//     let timeout;
//     return function executedFunction(...args) {
//       const later = () => {
//         clearTimeout(timeout);
//         func(...args);
//       };
//       clearTimeout(timeout);
//       timeout = setTimeout(later, wait);
//     };
//   };

//   // Throttle function for rapid events
//   const throttle = (func, limit) => {
//     let inThrottle;
//     return function(...args) {
//       if (!inThrottle) {
//         func.apply(this, args);
//         inThrottle = true;
//         setTimeout(() => inThrottle = false, limit);
//       }
//     };
//   };

//   // Unified fetch handler with error handling
//   async function fetchAPI(endpoint, options = {}) {
//     try {
//       const response = await fetch(endpoint, {
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//           'X-Requested-With': 'XMLHttpRequest'
//         },
//         ...options
//       });
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       return await response.json();
//     } catch (error) {
//       console.error('API Error:', error);
//       throw error;
//     }
//   }

//   // Spinner management
//   const spinnerManager = {
//     show(element) {
//       const spinner = document.createElement("div");
//       spinner.classList.add("line-item-spinner");
//       spinner.innerHTML = '<div class="spinner"></div>';
//       element.style.position = "relative";
//       element.appendChild(spinner);
//     },
//     hide(element) {
//       element.querySelector(".line-item-spinner")?.remove();
//     }
//   };

//   // Cart state management
//   const cartState = {
//     async update() {
//       const cart = await fetchAPI(CONSTANTS.CART_ENDPOINTS.get);
//       await this.updateUI(cart);
//       return cart;
//     },
//     async updateUI(cart) {
//       const cartTotal = cart.total_price / 100;
//       const remaining = Math.max(0, CONSTANTS.FREE_SHIPPING_THRESHOLD - cartTotal);
//       const progress = Math.min(100, (cartTotal / CONSTANTS.FREE_SHIPPING_THRESHOLD) * 100);

//       // Update DOM
//       elements.cartItems.style.display = cart.item_count > 0 ? "flex" : "none";
//       elements.emptyCart.style.display = cart.item_count > 0 ? "none" : "flex";
//       elements.progressBar.style.width = `${progress}%`;
      
//       elements.progressText.innerHTML = remaining > 0 
//         ? `Add <strong>$${remaining.toFixed(2)}</strong> more to get Free Shipping!`
//         : "You've got Free Shipping! 🎉";

//       if (remaining <= 0) {
//         elements.freeShipping.innerHTML = '<h3>Shipping</h3><span>FREE</span>';
//       }

//       updateOfferButtons(cart);
//     }
//   };

//   // Initialize Swiper with lazy loading
//   function initializeSwiper() {
//     if (mySwiper) {
//       mySwiper.destroy();
//     }
//     mySwiper = new Swiper('.swiper', {
//       slidesPerView: 'auto',
//       spaceBetween: 10,
//       lazy: true,
//       pagination: {
//         el: ".swiper-pagination",
//         type: "progressbar"
//       }
//     });
//   }

//   // Event delegation for cart drawer
//   elements.cartBox.addEventListener('click', (e) => {
//     const target = e.target;
    
//     // Handle quantity buttons
//     if (target.closest('.line-item__quantity-selector button')) {
//       handleQuantityChange(e);
//     }
    
//     // Handle remove buttons
//     if (target.closest('.line-item__remove')) {
//       handleRemoveItem(e);
//     }
    
//     // Handle offer claim buttons
//     if (target.closest('.claim-offer__btn')) {
//       handleClaimOffer(e);
//     }
//   });

//   // Event handlers
//   async function handleQuantityChange(e) {
//     const button = e.target;
//     const lineItem = button.closest('.line-item');
//     const key = lineItem.getAttribute("data-line-item-key");
//     const input = button.parentElement.querySelector("input");
//     const isIncrease = button.classList.contains("line-item__quantity-selector-plus");
//     const newQuantity = Number(input.value) + (isIncrease ? 1 : -1);

//     if (newQuantity < 0) return;

//     spinnerManager.show(lineItem);
//     try {
//       await fetchAPI(CONSTANTS.CART_ENDPOINTS.update, {
//         method: 'POST',
//         body: JSON.stringify({ updates: { [key]: newQuantity } })
//       });
//       await updateCartDrawer();
//     } finally {
//       spinnerManager.hide(lineItem);
//     }
//   }

//   async function handleRemoveItem(e) {
//     const lineItem = e.target.closest('.line-item');
//     const key = lineItem.getAttribute("data-line-item-key");

//     spinnerManager.show(lineItem);
//     try {
//       await fetchAPI(CONSTANTS.CART_ENDPOINTS.update, {
//         method: 'POST',
//         body: JSON.stringify({ updates: { [key]: 0 } })
//       });
//       await updateCartDrawer();
//     } finally {
//       spinnerManager.hide(lineItem);
//     }
//   }

//   async function handleClaimOffer(e) {
//     const button = e.target;
//     const productId = button.getAttribute('data-product-id');

//     try {
//       await fetchAPI(CONSTANTS.CART_ENDPOINTS.add, {
//         method: 'POST',
//         body: JSON.stringify({ id: productId, quantity: 1 })
//       });
      
//       button.disabled = true;
//       button.textContent = 'Offer Claimed';
//       await updateCartDrawer();
//     } catch (error) {
//       button.textContent = 'Failed to claim offer';
//     }
//   }

//   // Update cart drawer with optimized DOM updates
//   async function updateCartDrawer() {
//     const savedContent = {
//       offers: elements.cartDrawer.querySelector(".product-offers__wrapper")?.innerHTML,
//       payment: elements.cartDrawer.querySelector('.cart-drawer__payment-provider-img')?.innerHTML
//     };

//     const response = await fetch("/?section_id=cart-drawer-new");
//     const html = new DOMParser().parseFromString(await response.text(), 'text/html');
    
//     const newContent = html.querySelector(".cart-drawer__wrapper").innerHTML;
//     elements.cartBox.innerHTML = newContent;

//     // Restore saved content
//     if (savedContent.offers) {
//       elements.cartBox.querySelector(".product-offers__wrapper").innerHTML = savedContent.offers;
//     }
//     if (savedContent.payment) {
//       elements.cartBox.querySelector('.cart-drawer__payment-provider-img').innerHTML = savedContent.payment;
//     }

//     await cartState.update();
//     initializeSwiper();
//   }

//   // Initialize
//   cartState.update();
//   initializeSwiper();
// });


document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM elements
  const elements = {
    cartDrawer: document.querySelector(".cart-drawer__wrapper"),
    cartOverlay: document.querySelector('.cart-overlay'),
    cartBox: document.querySelector(".cart-drawer__box"),
    form: document.querySelector('form'),
    progressBar: document.querySelector('.cart-shipping__progress-bar'),
    progressText: document.querySelector('.cart-shipping__progress-text'),
    freeShipping: document.querySelector('.cart-drawer__footer-row.shipping'),
    emptyCart: document.querySelector('.cart-drawer__empty'),
    cartItems: document.querySelector('.cart-drawer__items')
  };

  window.cartDrawer = elements.cartDrawer;
  window.cartOverlay = elements.cartOverlay;

  const CONSTANTS = {
    FREE_SHIPPING_THRESHOLD: 75.00,
    SPINNER_DELAY: 1000,
    CART_ENDPOINTS: {
      get: '/cart.js',
      update: '/cart/update.js',
      add: '/cart/add.js',
      change: '/cart/change.js'
    }
  };

  let mySwiper = null;

  // Prevent default form submission
  elements.form?.addEventListener('submit', e => e.preventDefault());

  // Spinner management
  const spinnerManager = {
    show(element) {
      const spinner = document.createElement("div");
      spinner.classList.add("line-item-spinner");
      spinner.innerHTML = '<div class="spinner"></div>';
      element.style.position = "relative";
      element.appendChild(spinner);
    },
    hide(element) {
      element.querySelector(".line-item-spinner")?.remove();
    }
  };

  function toggleSubscriptionDropdown(lineIndex, showDropdown) {
    const dropdown = document.querySelector(`.subscription-dropdown[data-line="${lineIndex}"]`);
    if (dropdown) {
      dropdown.style.display = showDropdown ? 'block' : 'none';
    }
  }

  function closeCart() {
    const closeBtn = document.querySelector(".cart-close__btn");
    
    closeBtn?.addEventListener("click", () => {
      elements.cartDrawer.classList.remove("cart-drawer--active");
      elements.cartDrawer.classList.add("close");
      elements.cartOverlay.classList.remove('is-visible');
      document.body.style.overflow = '';
    });

    elements.cartOverlay.addEventListener("click", () => {
      elements.cartDrawer.classList.remove("cart-drawer--active");
      elements.cartDrawer.classList.add("close");
      elements.cartOverlay.classList.remove('is-visible');
      document.body.style.overflow = '';
    });
  }

  function addSubscriptionListeners() {
    document.querySelectorAll('.subscription-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const lineIndex = e.target.getAttribute('data-line');
        const isChecked = e.target.checked;
        const lineItem = e.target.closest('.line-item');

        spinnerManager.show(lineItem);
        toggleSubscriptionDropdown(lineIndex, isChecked);

        setTimeout(() => {
          spinnerManager.hide(lineItem);
        }, CONSTANTS.SPINNER_DELAY);
      });
    });

    document.querySelectorAll('.info-circle').forEach(infoCircle => {
      infoCircle.addEventListener('click', (e) => {
        const parent = e.target.closest('.subscription-options');
        const checkbox = parent.querySelector('.subscription-checkbox');
        const lineIndex = checkbox.getAttribute('data-line');
        const lineItem = e.target.closest('.line-item');

        toggleSubscriptionDropdown(lineIndex, true);
        spinnerManager.show(lineItem);
        
        setTimeout(() => {
          spinnerManager.hide(lineItem);
        }, CONSTANTS.SPINNER_DELAY);
      });
    });
  }

  function updateSubscriptionStatus() {
    document.querySelectorAll('.selling-plan-selector').forEach(selector => {
      const lineIndex = selector.getAttribute('data-line');
      const hasSubscription = selector.value !== '';
      const checkbox = document.querySelector(`.subscription-checkbox[data-line="${lineIndex}"]`);
      
      if (checkbox) {
        checkbox.checked = hasSubscription;
        toggleSubscriptionDropdown(lineIndex, false);
      }
    });
  }

  // async function updateShippingProgress() {
  //   try {
  //     const cart = await fetch(CONSTANTS.CART_ENDPOINTS.get).then(res => res.json());
  //     const cartTotal = cart.total_price / 100;
  //     const remaining = Math.max(0, CONSTANTS.FREE_SHIPPING_THRESHOLD - cartTotal);
  //     const progress = Math.min(100, (cartTotal / CONSTANTS.FREE_SHIPPING_THRESHOLD) * 100);

  //     if (cart.item_count > 0) {
  //       elements.cartItems.style.display = "flex";
  //       elements.emptyCart.style.display = "none";
  //     } else {
  //       elements.cartItems.style.display = "none";
  //       elements.emptyCart.style.display = "flex";
  //     }

  //     elements.progressBar.style.width = `${progress}%`;

  //     if (remaining > 0) {
  //       elements.progressText.innerHTML = `Add <strong>$${remaining.toFixed(2)}</strong> more to get Free Shipping!`;
  //     } else {
  //       elements.progressText.textContent = "You've got Free Shipping! 🎉";
  //       elements.freeShipping.innerHTML = `
  //         <h3>Shipping</h3>
  //         <span>FREE</span>
  //       `;
  //     }
  //   } catch (error) {
  //     console.error('Error updating shipping progress:', error);
  //   }
  // }

  // Replace the existing updateShippingProgress function with this:
async function updateShippingProgress() {
  try {
    const cart = await fetch(CONSTANTS.CART_ENDPOINTS.get).then(res => res.json());
    const cartTotal = cart.total_price / 100;
    const remaining = Math.max(0, CONSTANTS.FREE_SHIPPING_THRESHOLD - cartTotal);
    const progress = Math.min(100, (cartTotal / CONSTANTS.FREE_SHIPPING_THRESHOLD) * 100);

    // Update these selectors to match your HTML structure
    const cartItems = document.querySelector('.cart-drawer__items');
    const emptyCart = document.querySelector('.cart-drawer__empty');

    // Add console.log to debug
    console.log('Cart item count:', cart.item_count);
    console.log('Cart items element:', cartItems);
    console.log('Empty cart element:', emptyCart);

    if (cart.item_count > 0) {
      if (cartItems) cartItems.style.display = "block"; // Changed from flex to block
      if (emptyCart) emptyCart.style.display = "none";
    } else {
      if (cartItems) cartItems.style.display = "none";
      if (emptyCart) emptyCart.style.display = "block"; // Changed from flex to block
    }

    if (elements.progressBar) elements.progressBar.style.width = `${progress}%`;

    if (elements.progressText) {
      if (remaining > 0) {
        elements.progressText.innerHTML = `Add <strong>$${remaining.toFixed(2)}</strong> more to get Free Shipping!`;
      } else {
        elements.progressText.textContent = "You've got Free Shipping! 🎉";
        if (elements.freeShipping) {
          elements.freeShipping.innerHTML = `
            <h3>Shipping</h3>
            <span>FREE</span>
          `;
        }
      }
    }
  } catch (error) {
    console.error('Error updating shipping progress:', error);
  }
}

  // function updateOfferButtons(cart) {
  //   const cartTotal = cart.total_price / 100;
  //   const offerButtons = document.querySelectorAll('.claim-offer__btn');
  //   const offerProductIds = [...offerButtons].map(btn => btn.getAttribute('data-product-id'));
  //   const claimedOffer = cart.items.find(item => offerProductIds.includes(item.id.toString()));

  //   offerButtons.forEach(button => {
  //     const productId = button.getAttribute('data-product-id');
  //     const offerProductCard = button.closest('.offer__product-card');
  //     const minTotal = parseFloat(offerProductCard.getAttribute('data-min-value'));

  //     if (claimedOffer && claimedOffer.id.toString() !== productId) {
  //       button.disabled = true;
  //       button.classList.add('claim-offer__btn--disabled');
  //       button.textContent = "Offer Already Claimed";
  //     } else if (!claimedOffer) {
  //       if (cartTotal >= minTotal) {
  //         button.disabled = false;
  //         button.classList.remove('claim-offer__btn--disabled');
  //         button.textContent = "Claim Offer";
  //       } else {
  //         button.disabled = true;
  //         button.classList.add('claim-offer__btn--disabled');
  //         button.textContent = `Add $${(minTotal - cartTotal).toFixed(2)} more to claim`;
  //       }
  //     } else if (claimedOffer.id.toString() === productId) {
  //       button.disabled = true;
  //       button.classList.add('claim-offer__btn--disabled');
  //       button.textContent = "Offer Claimed";
  //     }
  //   });
  // }

  function updateOfferButtons(cart) {
  const cartTotal = cart.total_price / 100;
  const offerButtons = document.querySelectorAll('.claim-offer__btn');
  
  // Add debug logging
  console.log('Cart total:', cartTotal);
  console.log('Found offer buttons:', offerButtons.length);

  offerButtons.forEach(button => {
    const productId = button.getAttribute('data-product-id');
    const offerProductCard = button.closest('.offer__product-card');
    
    if (!offerProductCard) {
      console.log('Could not find offer product card for button:', button);
      return;
    }

    const minTotal = parseFloat(offerProductCard.getAttribute('data-min-value'));
    
    // Add debug logging
    console.log('Product ID:', productId);
    console.log('Min total required:', minTotal);

    // Check if this offer is already in cart
    const claimedOffer = cart.items.find(item => item.id.toString() === productId);

    if (claimedOffer) {
      button.disabled = true;
      button.classList.add('claim-offer__btn--disabled');
      button.textContent = "Offer Claimed";
    } else {
      if (cartTotal >= minTotal) {
        button.disabled = false;
        button.classList.remove('claim-offer__btn--disabled');
        button.textContent = "Claim Offer";
      } else {
        button.disabled = true;
        button.classList.add('claim-offer__btn--disabled');
        button.textContent = `Add $${(minTotal - cartTotal).toFixed(2)} more to claim`;
      }
    }
  });
}
  
  function updateSellingPlan() {
    document.querySelectorAll('[name="selling-plan"]').forEach(function (element) {
      element.addEventListener("change", async (event) => {
        const lineItem = event.target.closest('.line-item');
        const lineIndex = event.target.getAttribute('data-line');
        const data = {
          line: event.target.dataset.line,
          quantity: event.target.dataset.quantity,
          id: event.target.value,
        };

        spinnerManager.show(lineItem);

        try {
          const response = await fetch(CONSTANTS.CART_ENDPOINTS.change, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              line: data.line,
              quantity: data.quantity,
              selling_plan: data.id,
            }),
          });

          if (!response.ok) throw new Error('Selling plan update failed');

          await updateCartDrawer();
          toggleSubscriptionDropdown(lineIndex, false);
        } catch (error) {
          console.error("Error updating selling plan:", error);
        } finally {
          spinnerManager.hide(lineItem);
        }
      });
    });
  }

  function initializeSwiper() {
    if (mySwiper) {
      mySwiper.destroy();
    }
    mySwiper = new Swiper('.swiper', {
      slidesPerView: 'auto',
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
      },
    });
  }

  async function updateCartDrawer() {
    const productOffersWrapper = document.querySelector(".product-offers__wrapper");
    const savedOffersContent = productOffersWrapper ? productOffersWrapper.innerHTML : '';
    const paymentProvider = document.querySelector('.cart-drawer__payment-provider-img');
    const savePaymentProvider = paymentProvider ? paymentProvider.innerHTML : '';

    try {
      const res = await fetch("/?section_id=cart-drawer-new");
      const text = await res.text();
      const html = document.createElement("div");
      html.innerHTML = text;

      const newBox = html.querySelector(".cart-drawer__wrapper").innerHTML;
      document.querySelector(".cart-drawer__box").innerHTML = newBox;

      if (document.querySelector(".product-offers__wrapper")) {
        document.querySelector(".product-offers__wrapper").innerHTML = savedOffersContent;
      }

      if(document.querySelector('.cart-drawer__payment-provider-img')) {
        document.querySelector('.cart-drawer__payment-provider-img').innerHTML = savePaymentProvider;
      }

      const cartResponse = await fetch(CONSTANTS.CART_ENDPOINTS.get);
      const cartData = await cartResponse.json();
      updateOfferButtons(cartData);
      
      updateShippingProgress();
      addCartDrawerListeners();
      initializeSwiper();
    } catch (error) {
      console.error('Error updating cart drawer:', error);
    }
  }

  function addCartDrawerListeners() {
    document.querySelectorAll(".line-item__quantity-selector button").forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();

        const lineItem = e.target.closest('.line-item');
        const parentEl = button.closest("[data-line-item-key]");
        const key = parentEl.getAttribute("data-line-item-key");
        const currentQuantity = Number(button.parentElement.querySelector("input").value);
        const isUp = button.classList.contains("line-item__quantity-selector-plus");
        const newQuantity = isUp ? currentQuantity + 1 : currentQuantity - 1;

        spinnerManager.show(lineItem);

        try {
          await fetch(CONSTANTS.CART_ENDPOINTS.update, {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ updates: { [key]: newQuantity } }),
          });

          await updateCartDrawer();
        } catch (error) {
          console.error("Error updating quantity:", error);
        } finally {
          spinnerManager.hide(lineItem);
        }
      });
    });

    // document.querySelectorAll('.claim-offer__btn').forEach(button => {
    //   button.addEventListener('click', async function (event) {
    //     event.preventDefault();
    //     const productId = this.getAttribute('data-product-id');

    //     try {
    //       const response = await fetch(CONSTANTS.CART_ENDPOINTS.add, {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'X-Requested-With': 'XMLHttpRequest'
    //         },
    //         body: JSON.stringify({
    //           id: productId,
    //           quantity: 1
    //         })
    //       });

    //       if (!response.ok) throw new Error("Failed to add offer product to cart");

    //       this.disabled = true;
    //       this.textContent = 'Offer Claimed';
    //       await updateCartDrawer();
    //     } catch (error) {
    //       console.error('Error adding product to cart:', error);
    //     }
    //   });
    // });

    // Update the event listener for claim offer buttons
document.querySelectorAll('.claim-offer__btn').forEach(button => {
  button.addEventListener('click', async function(event) {
    event.preventDefault();
    
    // Add debug logging
    console.log('Claim offer button clicked');
    
    const productId = this.getAttribute('data-product-id');
    console.log('Product ID to add:', productId);

    try {
      const response = await fetch(CONSTANTS.CART_ENDPOINTS.add, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          items: [{
            id: productId,
            quantity: 1
          }]
        })
      });

      if (!response.ok) {
        throw new Error("Failed to add offer product to cart");
      }

      this.disabled = true;
      this.classList.add('claim-offer__btn--disabled');
      this.textContent = 'Offer Claimed';
      
      await updateCartDrawer();
    } catch (error) {
      console.error('Error adding product to cart:', error);
      this.textContent = 'Failed to claim offer';
    }
  });
});

    document.querySelectorAll('.line-item__remove').forEach(button => {
      button.addEventListener('click', async function (event) {
        event.preventDefault();
        const lineItem = event.target.closest('.line-item');
        const key = lineItem.getAttribute("data-line-item-key");

        spinnerManager.show(lineItem);

        try {
          await fetch(CONSTANTS.CART_ENDPOINTS.update, {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ updates: { [key]: 0 } }),
          });

          await updateCartDrawer();
        } catch (error) {
          console.error("Error removing item:", error);
        } finally {
          spinnerManager.hide(lineItem);
        }
      });
    });

    closeCart();
    updateSellingPlan();
    addSubscriptionListeners();
  }

  // Handle add to cart form submissions
  document.querySelectorAll('form[action="/cart/add"]').forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const productOffersWrapper = document.querySelector(".product-offers__wrapper");
      const savedOffersContent = productOffersWrapper ? productOffersWrapper.innerHTML : '';

      try {
        const response = await fetch("/cart/add", {
          method: "post",
          body: new FormData(form),
        });

        if (!response.ok) throw new Error("Failed to add item to cart");

        if (productOffersWrapper) {
          productOffersWrapper.innerHTML = savedOffersContent;
        }

        await updateCartDrawer();
        elements.cartDrawer.classList.add("cart-drawer--active");
        elements.cartDrawer.classList.remove("close");
        elements.cartOverlay.classList.add('is-visible');
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    });
  });

  // Initialize everything
  addCartDrawerListeners();
  updateSubscriptionStatus();
  updateShippingProgress();
  initializeSwiper();
  
  // Initial cart fetch for offer buttons
  fetch(CONSTANTS.CART_ENDPOINTS.get)
    .then(response => response.json())
    .then(cart => {
      updateOfferButtons(cart);
    })
    .catch(error => console.error('Error fetching cart data:', error));
});