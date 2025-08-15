document.addEventListener('DOMContentLoaded', () => {
  const cartCounter = document.querySelector('.cart-count');
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  updateCartCount();

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
      const card = this.closest('.flavor-card');

      if (!card) return;

      const name = card.querySelector('h4').textContent;
      let priceElement = card.querySelector('.new-price') || card.querySelector('.price');
      let price = parseFloat(priceElement.textContent.replace('$', ''));
      const image = card.querySelector('img').getAttribute('src');

      const existingItem = cartItems.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({
          name,
          price,
          image,
          quantity: 1
        });
      }

      localStorage.setItem('cart', JSON.stringify(cartItems));
      updateCartCount();

      showToast(`${name} added to cart!`);
    });
  });

  function updateCartCount() {
    if (cartCounter) {
      const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      cartCounter.textContent = count;
    }
  }
});

function updateDonut() {
  const base = document.getElementById("base-select").value;
  const filling = document.getElementById("filling-select").value;
  const topping = document.getElementById("topping-select").value;

  document.getElementById("donut-base").src = `images/${base}`;
  document.getElementById("donut-filling").src = `images/${filling}`;
  document.getElementById("donut-topping").src = `images/${topping}`;
}

document.querySelectorAll('.order-btn').forEach(button => {
  button.addEventListener('click', function () {
    const container = button.closest('.hero-text');

    const name = container.querySelector('.order-name')?.textContent.trim() || "Donut";
    const priceText = container.querySelector('.new-price')?.textContent.replace('$', '') || "0";
    const price = parseFloat(priceText);
    const image = document.querySelector('.hero-image img')?.src || "images/sample-donut.png";

    const product = {
      name,
      price,
      image,
      quantity: 1
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    window.location.href = "checkout.html";
  });
});


function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("loggedInUser");
  window.location.href = "../login.html";
}


function showToast(message = "✔️ Added to cart!") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
