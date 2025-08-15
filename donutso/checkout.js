const cart = JSON.parse(localStorage.getItem("cart")) || [];
const imageEl = document.getElementById("checkout-image");

if (imageEl && cart.length > 0) {
  imageEl.src = cart[0].image;
  imageEl.alt = cart[0].name || "Donut";
} else if (imageEl) {
  imageEl.src = "images/sample-donut.png";
  imageEl.alt = "Donut";
}

const itemsContainer = document.getElementById("checkout-items");
const totalEl = document.getElementById("checkout-total");
const discountInfoEl = document.getElementById("checkout-discount-info");

let subtotal = 0;

cart.forEach(item => {
  const itemTotal = item.price * item.quantity;
  subtotal += itemTotal;

  const itemEl = document.createElement("div");
  itemEl.className = "checkout-item";
  itemEl.innerHTML = `
    <img src="${item.image}" alt="${item.name}" style="width: 100px; border-radius: 10px;">
    <div class="item-details">
      <h4>${item.name}</h4>
      <p>Price: $${item.price.toFixed(2)}</p>
      <p>Qty: ${item.quantity}</p>
      <p>Subtotal: $${itemTotal.toFixed(2)}</p>
    </div>
  `;
  itemsContainer.appendChild(itemEl);
});

const discountRate = parseFloat(localStorage.getItem("cartDiscount")) || 0;
const discountAmount = subtotal * (discountRate / 100);
const finalTotal = subtotal - discountAmount;

if (totalEl) {
  totalEl.textContent = `$${finalTotal.toFixed(2)}`;
}

if (discountRate > 0 && discountInfoEl) {
  discountInfoEl.textContent = `Discount Applied: ${discountRate}% (-$${discountAmount.toFixed(2)})`;
}

function showToast(message = "✔️ Done!") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

document.getElementById("submit-order").addEventListener("click", () => {
  localStorage.removeItem("cart");
  localStorage.removeItem("cartDiscount"); 

  updateCartCount();

  showToast("✔️ Done!");


  if (itemsContainer) {
    itemsContainer.innerHTML = "";
  }
  if (totalEl) {
    totalEl.textContent = "$0.00";
  }
  if (discountInfoEl) {
    discountInfoEl.textContent = "";
  }
  if (imageEl) {
    imageEl.src = "images/sample-donut.png";
    imageEl.alt = "Donut";
  }
});



if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}
