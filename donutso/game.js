window.addEventListener("DOMContentLoaded", () => {
  const baseImg = document.getElementById('donut-base');
  const toppingImg = document.getElementById('donut-topping');
  const extraImg = document.getElementById('donut-extra');
  const comboImg = document.getElementById('donut-combo');
  const priceText = document.getElementById('price');

  let selectedBase = 'classic';
  let selectedTopping = '';
  let selectedExtra = '';

  baseImg.src = `../donutso_game_assets/Bases/${selectedBase}.png`;
  updateDonut();
  updateCartCount(); 
  document.querySelectorAll('.option-card img').forEach(img => {
    img.addEventListener('click', () => {
      const type = img.dataset.type;
      const file = getFileName(img.src);

      if (type === 'topping') selectedTopping = file;
      else if (type === 'extra') selectedExtra = file;

      updateDonut();
    });
  });

  function getFileName(path) {
    return path.split('/').pop().replace('.png', '');
  }

  function updateDonut() {
    if (selectedTopping && selectedExtra) {
      comboImg.src = `../donutso_game_assets/combos/${selectedBase} ${selectedTopping} ${selectedExtra}.png`;
      comboImg.style.display = 'block';
      baseImg.style.display = toppingImg.style.display = extraImg.style.display = 'none';
    } else if (selectedTopping) {
      comboImg.src = `../donutso_game_assets/combos/${selectedBase} ${selectedTopping}.png`;
      comboImg.style.display = 'block';
      baseImg.style.display = toppingImg.style.display = extraImg.style.display = 'none';
    } else {
      comboImg.style.display = 'none';
      baseImg.style.display = 'block';
      toppingImg.style.display = 'block';
      extraImg.style.display = 'block';

      baseImg.src = `../donutso_game_assets/Bases/${selectedBase}.png`;
      toppingImg.src = selectedTopping ? `../donutso_game_assets/Toppings/${selectedTopping}.png` : '';
      extraImg.src = selectedExtra ? `../donutso_game_assets/Extras/${selectedExtra}.png` : '';
    }

    updatePrice();
  }

  function updatePrice() {
    let price = 0.5;
    if (selectedTopping) price += 0.75;
    if (selectedExtra) price += 1.5;

    priceText.innerText = `Total: $${price.toFixed(2)}`;
    priceText.style.transform = 'scale(1.1)';
    setTimeout(() => priceText.style.transform = 'scale(1)', 200);
  }

  document.getElementById("add-to-cart").addEventListener("click", () => {
    let imagePath = comboImg.style.display === 'block' ? comboImg.src : baseImg.src;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const item = {
      image: imagePath,
      name: "Custom Donut",
      base: selectedBase,
      topping: selectedTopping,
      extra: selectedExtra,
      quantity: 1,
      price: calculatePrice()
    };

    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount(); 
    showToast("✔️ Donut added to cart!"); 
  });

  function calculatePrice() {
    let price = 0.5;
    if (selectedTopping) price += 0.75;
    if (selectedExtra) price += 1.5;
    return price;
  }
});

function updateCartCount() {
  const cartCounter = document.querySelector('.cart-count');
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCounter) {
    cartCounter.textContent = count;
  }
}

function showToast(message = "✔️ Added to cart!") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
