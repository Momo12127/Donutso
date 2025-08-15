let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");

const subtotalEl = document.getElementById("summary-subtotal");
const discountEl = document.getElementById("summary-discount");

const discountInput = document.getElementById("summary-coupon");
const discountBtn = document.getElementById("apply-discount");
const discountInfo = document.getElementById("discount-info");

let appliedDiscount = 0;
let currentCode = "";

const discountCodes = {
  "DONUT10": 0.10,
  "SWEET15": 0.15,
  "PINK20": 0.20,
  "DONBOSCO":0.50
};

function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    subtotalEl.textContent = "USD 0.00";
    discountEl.textContent = "USD 0.00";
    cartTotalEl.textContent = "0.00";

    localStorage.setItem("cartTotal", "0.00");
    localStorage.setItem("cartDiscount", "0");
    return;
  }

  let subtotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";

    itemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="item-img" />
      <div class="item-details">
        <h3>${item.name}</h3>
        <p>$${itemTotal.toFixed(2)}</p>
      </div>
      <div class="cart-actions">
        <div class="qty-controls">
          <button onclick="changeQty(${index}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;

    cartItemsContainer.appendChild(itemEl);
  });

  const discountAmount = subtotal * appliedDiscount;
  const total = subtotal - discountAmount;

  subtotalEl.textContent = `USD ${subtotal.toFixed(2)}`;
  discountEl.textContent = `USD ${discountAmount.toFixed(2)}`;
  cartTotalEl.textContent = `${total.toFixed(2)}`;

  if (!isNaN(total)) {
    localStorage.setItem("cartTotal", total.toFixed(2));
    localStorage.setItem("cartDiscount", (appliedDiscount * 100).toFixed(0));
  }
}

function changeQty(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

discountBtn.addEventListener("click", () => {
  const code = discountInput.value.trim().toUpperCase();

  if (discountCodes.hasOwnProperty(code)) {
    appliedDiscount = discountCodes[code];
    currentCode = code;

    discountInfo.innerHTML = `Discount <strong>${code}</strong> applied: <strong>${Math.round(appliedDiscount * 100)}%</strong> 
    <button id="remove-code" style="margin-left: 10px; background: transparent; border: none; color: red; cursor: pointer;">❌</button>`;
    
    discountBtn.textContent = "APPLIED";
    discountBtn.style.backgroundColor = "green";
    discountBtn.style.color = "#fff";
    discountBtn.disabled = true;

    renderCart();


    document.getElementById("remove-code").addEventListener("click", () => {
      appliedDiscount = 0;
      currentCode = "";
      discountInput.value = "";
      discountInfo.textContent = "";
      discountBtn.textContent = "Apply";
      discountBtn.style.backgroundColor = "";
      discountBtn.style.color = "";
      discountBtn.disabled = false;
      renderCart();
    });
  } else {
    alert("Invalid discount code!");
  }
});


document.getElementById("checkout")?.addEventListener("click", () => {
  window.location.href = "checkout.html";
});


renderCart();
