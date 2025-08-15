const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

function applyFilter(filter) {
  filterButtons.forEach(b => b.classList.remove('active'));
  document.querySelector(`[data-filter="${filter}"]`)?.classList.add('active');

  productCards.forEach(card => {
    if (filter === 'all' || card.classList.contains(filter)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const filter = urlParams.get('filter') || 'all';
  applyFilter(filter);
});


filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    applyFilter(filter);
  });
});

const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".product-card");
    const title = card.querySelector("h3").textContent;
    const priceEl = card.querySelector(".new-price") || card.querySelector(".price");
    const price = parseFloat(priceEl.textContent.replace("$", ""));
    const img = card.querySelector("img").src;

    const item = {
      title: title,
      price: price,
      img: img,
      quantity: 1,
    };

    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cartItems.find((i) => i.title === title);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));

    updateCartCount();

 
    showToast(`${title} added to cart!`);
  });
});


function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const badge = document.querySelector(".cart-count");
  if (badge) badge.textContent = count;
}


updateCartCount();

document.addEventListener('DOMContentLoaded', () => {
    const cartCounter = document.querySelector('.cart-count');
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  
    updateCartCount();
  
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', function () {
        const card = this.closest('.product-card');
  
        if (!card) return;
  
        const name = card.querySelector('h3').textContent;
        const priceElement = card.querySelector('.new-price') || card.querySelector('.price');
        const priceText = priceElement.textContent.replace('$', '').trim();
        const price = parseFloat(priceText);
        const image = card.querySelector('img').getAttribute('src');
  
        if (isNaN(price)) {
          alert("Price not valid");
          return;
        }
  
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
      });
    });
  
    function updateCartCount() {
      const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      if (cartCounter) {
        cartCounter.textContent = count;
      }
    }
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    const productsDiv = document.querySelector('.products');
    const productCards = document.querySelectorAll('.product-card');

    productsDiv.classList.add('visible');

    productCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 100); 
    });
});

  
  function showToast(message = "✔️ Added to cart!") {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
  
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
  }
  
