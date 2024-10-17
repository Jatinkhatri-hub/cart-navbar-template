
document.addEventListener("DOMContentLoaded", () => {
  const cartDrawer = document.querySelector(".cart-drawer__wrapper");
  window.cartDrawer = cartDrawer;

  document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
  });

  let mySwiper;

function initializeSwiper() {
  mySwiper = new Swiper('.swiper', {
    // your Swiper configuration
    slidesPerView: 'auto',
    spaceBetween: 10,
    // other Swiper settings
  });
}

// Call this function when the page loads initially
initializeSwiper();

  // Function to close the cart drawer
  function closeCart() {
    const closeBtn = document.querySelector(".cart-close__btn");
    closeBtn?.addEventListener("click", () => {
      cartDrawer.classList.remove("cart-drawer--active");
      cartDrawer.classList.add("close");
    });
  }

  function toggleSubscriptionDropdown(lineIndex, showDropdown) {
    const dropdown = document.querySelector(`.subscription-dropdown[data-line="${lineIndex}"]`);
    if (dropdown) {
      dropdown.style.display = showDropdown ? 'block' : 'none';
    }
  }

  // Show spinner over a line item
  function showSpinner(lineItem) {
    const spinner = document.createElement("div");
    spinner.classList.add("line-item-spinner");
    spinner.innerHTML = `<div class="spinner"></div>`; // Customize your spinner HTML
    lineItem.style.position = "relative";
    lineItem.appendChild(spinner);
  }

  // Hide spinner from a line item
  function hideSpinner(lineItem) {
    const spinner = lineItem.querySelector(".line-item-spinner");
    if (spinner) {
      spinner.remove();
    }
  }

  // Checkbox logic for subscription
  function addSubscriptionListeners() {
    document.querySelectorAll('.subscription-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const lineIndex = e.target.getAttribute('data-line');
        const isChecked = e.target.checked;
        const lineItem = e.target.closest('.line-item'); 

        showSpinner(lineItem);

        // Show dropdown when checkbox is checked
        toggleSubscriptionDropdown(lineIndex, isChecked);

        // Simulate fetch delay for spinner (you should remove this in actual implementation)
        setTimeout(() => {
          hideSpinner(lineItem); // Hide the spinner after the operation
        }, 1000); // Remove after testing
      });
    });

    // Info circle to toggle dropdown on click
    document.querySelectorAll('.info-circle').forEach(infoCircle => {
      infoCircle.addEventListener('click', (e) => {
        const parent = e.target.closest('.subscription-options');
        const checkbox = parent.querySelector('.subscription-checkbox');
        const lineIndex = checkbox.getAttribute('data-line');
        const lineItem = e.target.closest('.line-item');

        // Show the dropdown
        toggleSubscriptionDropdown(lineIndex, true);

        // Show spinner while updating (if needed)
        showSpinner(lineItem);
        setTimeout(() => {
          hideSpinner(lineItem); // Remove after testing
        }, 1000);

      });
    });
  }

  

  

  // Update subscription status for all items in the cart
  function updateSubscriptionStatus() {
    document.querySelectorAll('.selling-plan-selector').forEach(selector => {
      const lineIndex = selector.getAttribute('data-line');
      const hasSubscription = selector.value !== '';
      const checkbox = document.querySelector(`.subscription-checkbox[data-line="${lineIndex}"]`);

      
      

      checkbox.checked = hasSubscription;

      toggleSubscriptionDropdown(lineIndex, false);


      // Show or hide dropdown based on subscription
      // if (hasSubscription) {
      //   toggleSubscriptionDropdown(lineIndex, true);
      // }
    });
  }

  // function updateOfferButtons(cart) {
  //   const cartTotal = cart.total_price / 100; // Shopify returns total_price in cents
  //   const offerProducts = document.querySelectorAll('.offer__product-card');
  
  //   offerProducts.forEach(offer => {
  //     const productId = offer.getAttribute('data-product-id');
  //     const minTotal = parseFloat(offer.getAttribute('data-min-value'));
  //     const claimButton = offer.querySelector('.claim-offer__btn');
  
  //     // Check if cart.items exists and is an array
  //     const isProductInCart = cart.items && Array.isArray(cart.items)
  //       ? cart.items.some(item => item.id == productId)
  //       : false;
  
  //     if (isProductInCart) {
  //       // If the product is already in the cart, disable the button
  //       claimButton.disabled = true;
  //       claimButton.textContent = 'Offer Already Claimed';
  //     } else if (cartTotal >= minTotal) {
  //       // If cart total meets or exceeds the min_total, enable the button
  //       claimButton.disabled = false;
  //       claimButton.textContent = 'Claim Offer';
  //     } else {
  //       // Otherwise, disable the button because the cart total is too low
  //       claimButton.disabled = true;
  //       claimButton.textContent = `Add ${minTotal - cartTotal} more to claim`;
  //     }
  //   });
  // }

  // function updateOfferButtons(cart) {
  //   const offerProductIds = [...document.querySelectorAll('.claim-offer__btn')].map(btn => btn.getAttribute('data-product-id'));
    
  //   // Check if any offer product is in the cart
  //   const claimedOffer = cart.items.find(item => offerProductIds.includes(item.id.toString()));
  
  //   // Update button states based on claimed offer status
  //   document.querySelectorAll('.claim-offer__btn').forEach(button => {
  //     const productId = button.getAttribute('data-product-id');
  
  //     if (claimedOffer && claimedOffer.id.toString() !== productId) {
  //       // Disable other buttons if an offer has been claimed
  //       button.disabled = true;
  //       button.textContent = "Offer Already Claimed";
  //     } else if (!claimedOffer) {
  //       // Enable all buttons if no offer has been claimed
  //       button.disabled = false;
  //       button.textContent = "Claim Offer";
  //     } else if (claimedOffer.id.toString() === productId) {
  //       // Mark the claimed button as "Offer Claimed"
  //       button.disabled = true;
  //       button.textContent = "Offer Claimed";
  //     }
  //   });
  // }

  function updateOfferButtons(cart) {
    const cartTotal = cart.total_price / 100; // Shopify returns total_price in cents
    const offerProductIds = [...document.querySelectorAll('.claim-offer__btn')].map(btn => btn.getAttribute('data-product-id'));
  
    // Check if any offer product is in the cart
    const claimedOffer = cart.items.find(item => offerProductIds.includes(item.id.toString()));
  
    // Update button states based on claimed offer status and min-value comparison
    document.querySelectorAll('.claim-offer__btn').forEach(button => {
      const productId = button.getAttribute('data-product-id');
      const offerProductCard = button.closest('.offer__product-card'); // Assuming each button is inside a product card element
      const minTotal = parseFloat(offerProductCard.getAttribute('data-min-value')); // Get min value from the product card
  
      if (claimedOffer && claimedOffer.id.toString() !== productId) {
        // Disable other buttons if an offer has been claimed
        button.disabled = true;
        button.classList.add('claim-offer__btn--disabled');
        button.textContent = "Offer Already Claimed";
      } else if (!claimedOffer) {
        // If no offer has been claimed, check if the cart total meets the required minimum value
        if (cartTotal >= minTotal) {
          // Enable the button if cart total is sufficient
          button.disabled = false;
          button.classList.remove('claim-offer__btn--disabled');
          button.textContent = "Claim Offer";
        } else {
          // Disable the button if the cart total is less than the required minimum value
          button.disabled = true;
          button.classList.add('claim-offer__btn--disabled');
          button.textContent = `Add $${(minTotal - cartTotal).toFixed(2)} more to claim`;
        }
      } else if (claimedOffer.id.toString() === productId) {
        // Mark the claimed button as "Offer Claimed"
        button.disabled = true;
        button.classList.add('claim-offer__btn--disabled');
        button.textContent = "Offer Claimed";
      }
    });
  }
  

  // function updateOfferButtons(cart) {
  //   const cartTotal = cart.total_price / 100; // Shopify returns total_price in cents
  //   const offerProducts = document.querySelectorAll('.offer__product-card');

  //   offerProducts.forEach(offer => {
  //     const productId = offer.getAttribute('data-product-id');
  //     const minTotal = parseFloat(offer.getAttribute('data-min-value'));
  //     const claimButton = offer.querySelector('.claim-offer__btn');

  //     // Check if the product is already in the cart
  //     const isProductInCart = cart.items.some(item => item.id == productId);

  //     if (isProductInCart) {
  //       // If the product is already in the cart, disable the button
  //       claimButton.disabled = true;
  //       claimButton.textContent = 'Offer Already Claimed';
  //     } else if (cartTotal >= minTotal) {
  //       // If cart total meets or exceeds the min_total, enable the button
  //       claimButton.disabled = false;
  //       claimButton.textContent = 'Claim Offer';
  //     } else {
  //       // Otherwise, disable the button because the cart total is too low
  //       claimButton.disabled = true;
  //       claimButton.textContent = `Add ${minTotal - cartTotal} more to claim`;
  //     }
  //   });
  // }

  // Handle changes in selling plan
  function updateSellingPlan() {
    const sellingPlanSelectors = document.querySelectorAll('[name="selling-plan"]');

    sellingPlanSelectors.forEach(function (element) {
      element.addEventListener("change", async (event) => {
        const lineItem = event.target.closest('.line-item');
        const lineIndex = event.target.getAttribute('data-line');
        const data = {
          line: event.target.dataset.line,
          quantity: event.target.dataset.quantity,
          id: event.target.value,
        };

        // Show loading spinner
        showSpinner(lineItem);


        try {
          const response = await fetch("/cart/change.js", {
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

          if (!response.ok) {
            throw new Error('Selling plan update failed');
          }

          // Refresh cart drawer
          await updateCartDrawer();
          toggleSubscriptionDropdown(lineIndex, false);
        } catch (error) {
          console.error("Error updating selling plan:", error);
        } finally {
          // Hide spinner after request is completed
          hideSpinner(lineItem);
        }
      });
    });
  }

  // Update the cart drawer
  // async function updateCartDrawer() {

  //   const productOffersWrapper = document.querySelector(".product-offers__wrapper");
  //   const savedOffersContent = productOffersWrapper ? productOffersWrapper.innerHTML : '';
  
  

  //   const res = await fetch("/?section_id=cart-drawer-new");
  //   const text = await res.text();

  //   const html = document.createElement("div");
  //   html.innerHTML = text;

  //   const newBox = html.querySelector(".cart-drawer__wrapper").innerHTML;

  //   document.querySelector(".cart-drawer__box").innerHTML = newBox;

  //   if (document.querySelector(".product-offers__wrapper")) {
  //     document.querySelector(".product-offers__wrapper").innerHTML = savedOffersContent;
  //   }

  //   try {
  //     const cartResponse = await fetch('/cart.js');
  //     const cartData = await cartResponse.json();
  //     updateOfferButtons(cartData); // Update offer buttons with the latest cart data
  //   } catch (error) {
  //     console.error('Error fetching cart data:', error);
  //   }

  //   // Reapply event listeners
  //   addCartDrawerListeners();
  //   initializeSwiper();
  // }

  // Update the cart drawer
async function updateCartDrawer() {
  const productOffersWrapper = document.querySelector(".product-offers__wrapper");
  const savedOffersContent = productOffersWrapper ? productOffersWrapper.innerHTML : '';
  
  const res = await fetch("/?section_id=cart-drawer-new");
  const text = await res.text();

  const html = document.createElement("div");
  html.innerHTML = text;

  const newBox = html.querySelector(".cart-drawer__wrapper").innerHTML;
  document.querySelector(".cart-drawer__box").innerHTML = newBox;

  if (document.querySelector(".product-offers__wrapper")) {
    document.querySelector(".product-offers__wrapper").innerHTML = savedOffersContent;
  }

  try {
    const cartResponse = await fetch('/cart.js');
    const cartData = await cartResponse.json();
    updateOfferButtons(cartData); // Update offer buttons with the latest cart data
  } catch (error) {
    console.error('Error fetching cart data:', error);
  }

  // Reapply event listeners
  addCartDrawerListeners();
  initializeSwiper();
}

  // Quantity change event listener
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
        if (newQuantity < 1) return;

        // Show spinner over the line item
        showSpinner(lineItem);

        try {
          await fetch("/cart/update.js", {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ updates: { [key]: newQuantity } }),
          });

          // Update cart drawer
          await updateCartDrawer();
        } catch (error) {
          console.error("Error updating quantity:", error);
        } finally {
          // Hide spinner after the request completes
          hideSpinner(lineItem);
        }
      });
    });

    

    closeCart();
    updateSellingPlan();
    addSubscriptionListeners(); // Reapply subscription listeners here
  }

  //

  // AJAX form submission for adding to the cart
  document.querySelectorAll('form[action="/cart/add"]').forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      try {
        const response = await fetch("/cart/add", {
          method: "post",
          body: new FormData(form),
        });

        if (!response.ok) throw new Error("Failed to add item to cart");

        await updateCartDrawer();
        cartDrawer.classList.add("cart-drawer--active");
        cartDrawer.classList.remove("close");
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    });
  });

  // Initialize listeners
  addCartDrawerListeners();
  updateSubscriptionStatus();

  const claimOfferButtons = document.querySelectorAll(".claim-offer__btn");

  // claimOfferButtons.forEach(button => {
  //   button.addEventListener("click", async (event) => {
  //     event.preventDefault();
      
  //     const productId = button.getAttribute('data-product-id');
      
  //     if (!button.disabled) {
  //       try {
  //         // Add the product to cart for free
  //         const response = await fetch("/cart/add.js", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             items: [{
  //               id: productId,
  //               quantity: 1
  //             }]
  //           }),
  //         });

  //         if (response.ok) {
  //           // Disable button after claiming the offer
  //           button.disabled = true;
  //           button.textContent = "Offer Claimed";

  //           // Optionally update the cart drawer after the offer is claimed
  //           await updateCartDrawer();
  //         } else {
  //           throw new Error("Failed to add offer product to cart");
  //         }
  //       } catch (error) {
  //         console.error("Error claiming offer:", error);
  //       }
  //     }
  //   });
  // });

  fetch('/cart.js')
    .then(response => response.json())
    .then(cart => {
      console.log('Cart object:', cart);  // Add this line for debugging
      updateOfferButtons(cart);
    })
    .catch(error => console.error('Error fetching cart data:', error));

  // Event listener for claiming offers (optional, based on your logic)
  // document.querySelectorAll('.claim-offer__btn').forEach(button => {
  //   button.addEventListener('click', function (event) {
  //     event.preventDefault(); // Prevent the default button behavior
  
  //     const productId = this.getAttribute('data-product-id'); // Get the product ID
  //     const offerProductCard = this.closest('.offer__product-card');
  
  //     // Add product to the cart via AJAX
  //     fetch('/cart/add.js', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'X-Requested-With': 'XMLHttpRequest'
  //       },
  //       body: JSON.stringify({
  //         id: productId,
  //         quantity: 1
  //       })
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Product added to cart:', data);
  //       this.disabled = true; // Disable the button after claiming the offer

  //       // if (mySwiper) {
  //       //   mySwiper.destroy(true, true); // Destroy the current Swiper instance
  //       // }
        
  //       // initializeSwiper();

  //       this.textContent = 'Offer Already Claimed';
  //       updateCartDrawer(); // Optionally update the cart drawer if you have one
  //     })
  //     .catch(error => {
  //       console.error('Error adding product to cart:', error);
  //     });
  //   });
  // });

  // Event listener for claiming offers
// document.querySelectorAll('.claim-offer__btn').forEach(button => {
//   button.addEventListener('click', async function (event) {
//     event.preventDefault(); // Prevent the default button behavior

//     const productId = this.getAttribute('data-product-id');

//     try {
//       const response = await fetch('/cart/add.js', {
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

//       this.disabled = true; // Disable the button after claiming the offer
//       this.textContent = 'Offer Claimed';

//       // Update the cart drawer and offer buttons
//       await updateCartDrawer();

//     } catch (error) {
//       console.error('Error adding product to cart:', error);
//     }
//   });
// });

  
});
