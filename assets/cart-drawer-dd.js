// document.addEventListener('DOMContentLoaded', () => {

//   const cartDrawer = document.querySelector('.cart-drawer__wrapper');
//   window.cartDrawer = cartDrawer;
//   console.log(cartDrawer);

//   function closeCart() {
//     const closeBtn = document.querySelector('.cart-close__btn');
//     closeBtn.addEventListener('click', () => {
//       cartDrawer.classList.remove('cart-drawer--active');
//       cartDrawer.classList.add('close');
//     });
//   }

//   async function updateCartDrawer() {
//     const res = await fetch('/?section_id=cart-drawer-new');
//     const text = await res.text()

//     const html = document.createElement('div');
//     html.innerHTML = text;

//     const newBox = html.querySelector(".cart-drawer__wrapper").innerHTML;

//     document.querySelector(".cart-drawer__box").innerHTML = newBox

//     addCartDrawerListners();
//     console.log(html);

//   }
//   function addCartDrawerListners() {

//     document.querySelectorAll('.line-item__quantity-selector button').forEach(button => {

//       button.addEventListener('click' , async (e) =>{
//         e.preventDefault();
//         // Get line item key
//         const parentEl  =  button.parentElement;
//         console.log(parentEl);
//         const key = parentEl.getAttribute("data-line-item-key");

//         // Get new quantity
//         const currentQuantity = Number(button.parentElement.querySelector('input').value);
//         const isUp = button.classList.contains('line-item__quantity-selector-plus');

//         const newQuantity = isUp ? currentQuantity + 1 : currentQuantity - 1;

//         console.log({key, newQuantity});

//         // Ajax update\
//         const res = await fetch("/cart/update.js", {
//           method: "post",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ updates: { [key] : newQuantity } })
//         });

//         const json = await res.json();
//         console.log(json);

//         updateCartDrawer();

//       })

//     });

//     closeCart();

//   }

//   addCartDrawerListners();

//   document.querySelectorAll('form[action="/cart/add"]').forEach(form => {
//     form.addEventListener("submit", async (e) =>  {
//       e.preventDefault();

//       //submit form with a ajax
//       await fetch("/cart/add", {
//         method: "post",
//         body: new FormData(form),
//       });

//       // Update cart drawer
//       await updateCartDrawer();

//       cartDrawer.classList.add('cart-drawer--active');
//       cartDrawer.classList.remove('close');

//       addCartDrawerListners();

//     });
//   })

// });

// document.addEventListener("DOMContentLoaded", () => {
//   const cartDrawer = document.querySelector(".cart-drawer__wrapper");
//   window.cartDrawer = cartDrawer;
//   console.log(cartDrawer);

//   function closeCart() {
//     const closeBtn = document.querySelector(".cart-close__btn");
//     closeBtn.addEventListener("click", () => {
//       cartDrawer.classList.remove("cart-drawer--active");
//       cartDrawer.classList.add("close");
//     });
//   }

//   function updateSellingPlan() {
//     const sellingPlanSelectors = document.querySelectorAll(
//       '[name="selling-plan"]'
//     );

//     sellingPlanSelectors.forEach(function (element) {
//       element.addEventListener("change", function (event) {
//         const data = {
//           line: event.target.dataset.line,
//           quantity: event.target.dataset.quantity,
//           id: event.target.value,
//         };

//         fetch("/cart/change.js", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         })
//           .then((response) => {
//             // Refresh page, or re-render cart
//             updateCartDrawer();
//             console.log(response);
//           })
//           .catch((error) => {
//             console.error("Error:", error);
//           });
//       });
//     });
//   }

//   async function updateCartDrawer() {
//     const res = await fetch("/?section_id=cart-drawer-new");
//     const text = await res.text();

//     const html = document.createElement("div");
//     html.innerHTML = text;

//     const newBox = html.querySelector(".cart-drawer__wrapper").innerHTML;

//     document.querySelector(".cart-drawer__box").innerHTML = newBox;

//     addCartDrawerListeners();
//     console.log(html);
//   }

//   function addCartDrawerListeners() {
//     document
//       .querySelectorAll(".line-item__quantity-selector button")
//       .forEach((button) => {
//         button.addEventListener("click", async (e) => {
//           e.preventDefault();

//           const parentEl = button.closest("[data-line-item-key]");
//           const key = parentEl.getAttribute("data-line-item-key");

//           const currentQuantity = Number(
//             button.parentElement.querySelector("input").value
//           );
//           const isUp = button.classList.contains(
//             "line-item__quantity-selector-plus"
//           );

//           const newQuantity = isUp ? currentQuantity + 1 : currentQuantity - 1;

//           // Ensure quantity is not less than 1
//           if (newQuantity < 1) return;

//           console.log({ key, newQuantity });

//           // Ajax update
//           const res = await fetch("/cart/update.js", {
//             method: "post",
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ updates: { [key]: newQuantity } }),
//           });

//           const json = await res.json();
//           console.log(json);

//           await updateCartDrawer();
//         });
//       });

//     closeCart();
//     updateSellingPlan();
//   }

//   addCartDrawerListeners();

//   document.querySelectorAll('form[action="/cart/add"]').forEach((form) => {
//     form.addEventListener("submit", async (e) => {
//       e.preventDefault();

//       // Submit form with ajax
//       await fetch("/cart/add", {
//         method: "post",
//         body: new FormData(form),
//       });

//       // Update cart drawer
//       await updateCartDrawer();

//       cartDrawer.classList.add("cart-drawer--active");
//       cartDrawer.classList.remove("close");
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const cartDrawer = document.querySelector(".cart-drawer__wrapper");
  window.cartDrawer = cartDrawer;
  console.log(cartDrawer);

  // Function to close the cart drawer
  function closeCart() {
    const closeBtn = document.querySelector(".cart-close__btn");
    closeBtn.addEventListener("click", () => {
      cartDrawer.classList.remove("cart-drawer--active");
      cartDrawer.classList.add("close");
    });
  }

  function toggleSubscriptionDropdown(lineIndex, showDropdown) {
    const dropdown = document.querySelector(`.subscription-dropdown[data-line="${lineIndex}"]`);
    dropdown.style.display = showDropdown ? 'block' : 'none';
  }

  // Checkbox logic for subscription
  document.querySelectorAll('.subscription-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const lineIndex = e.target.getAttribute('data-line');
      const isChecked = e.target.checked;

      // Show dropdown when checkbox is checked
      toggleSubscriptionDropdown(lineIndex, isChecked);
    });
  });

  // Info circle to toggle dropdown on click
  document.querySelectorAll('.info-circle').forEach(infoCircle => {
    infoCircle.addEventListener('click', (e) => {
      const parent = e.target.closest('.subscription-options');
      const checkbox = parent.querySelector('.subscription-checkbox');
      const lineIndex = checkbox.getAttribute('data-line');

      // Show the dropdown
      toggleSubscriptionDropdown(lineIndex, true);
    });
  });

  // Add event listeners to handle when product is added without subscription
  function updateSubscriptionStatus() {
    document.querySelectorAll('.selling-plan-selector').forEach(selector => {
      const lineIndex = selector.getAttribute('data-line');
      const hasSubscription = selector.value !== '';
      const checkbox = document.querySelector(`.subscription-checkbox[data-line="${lineIndex}"]`);
      
      checkbox.checked = hasSubscription;

      // Show or hide dropdown based on subscription
      toggleSubscriptionDropdown(lineIndex, hasSubscription);
    });
  }

  // Function to handle selling plan changes
  function updateSellingPlan() {
    const sellingPlanSelectors = document.querySelectorAll(
      '[name="selling-plan"]'
    );

    sellingPlanSelectors.forEach(function (element) {
      element.addEventListener("change", function (event) {
        const data = {
          line: event.target.dataset.line,
          quantity: event.target.dataset.quantity,
          id: event.target.value,
        };

        fetch("/cart/change.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            line: data.line,
            quantity: data.quantity,
            selling_plan: data.id, // Correctly passing the selling plan ID
          }),
        })
          .then((response) => {
            if (!response.ok) throw new Error('Selling plan update failed');
            // Refresh the cart drawer to reflect the new selling plan
            updateCartDrawer();
            console.log(response);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    });
  }

  // Function to update the cart drawer contents
  async function updateCartDrawer() {
    const res = await fetch("/?section_id=cart-drawer-new");
    const text = await res.text();

    const html = document.createElement("div");
    html.innerHTML = text;

    const newBox = html.querySelector(".cart-drawer__wrapper").innerHTML;

    // Ensure that this targets the area where the updated cart drawer HTML should be placed
    document.querySelector(".cart-drawer__box").innerHTML = newBox;

    // Re-attach event listeners after updating the DOM
    addCartDrawerListeners();
    console.log(html);
  }

  // Function to handle quantity changes in the cart drawer
  function addCartDrawerListeners() {
    document
      .querySelectorAll(".line-item__quantity-selector button")
      .forEach((button) => {
        button.addEventListener("click", async (e) => {
          e.preventDefault();

          const parentEl = button.closest("[data-line-item-key]");
          const key = parentEl.getAttribute("data-line-item-key");

          const currentQuantity = Number(
            button.parentElement.querySelector("input").value
          );
          const isUp = button.classList.contains(
            "line-item__quantity-selector-plus"
          );

          const newQuantity = isUp ? currentQuantity + 1 : currentQuantity - 1;

          // Ensure quantity is not less than 1
          if (newQuantity < 1) return;

          console.log({ key, newQuantity });

          // Ajax update for the cart
          const res = await fetch("/cart/update.js", {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ updates: { [key]: newQuantity } }),
          });

          const json = await res.json();
          console.log(json);

          // After successful update, update the input field value
          parentEl.querySelector("input").value = newQuantity;

          // Refresh the cart drawer to reflect the new quantity
          await updateCartDrawer();
        });
      });

    closeCart(); // Re-attach close button event listener
    updateSellingPlan(); // Re-attach selling plan change listener
  }

  // Form submission to add products to the cart via AJAX
  document.querySelectorAll('form[action="/cart/add"]').forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Submit the form with AJAX
      await fetch("/cart/add", {
        method: "post",
        body: new FormData(form),
      });

      // Update cart drawer after adding the item
      await updateCartDrawer();

      // Show the cart drawer after the product is added
      cartDrawer.classList.add("cart-drawer--active");
      cartDrawer.classList.remove("close");
    });
  });

  // Initial attachment of event listeners
  addCartDrawerListeners();
  updateSubscriptionStatus();

});
