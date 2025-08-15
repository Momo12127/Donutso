const cart = JSON.parse(localStorage.getItem("cart")) || [];
const imageEl = document.getElementById("checkout-image");


if (imageEl) {
  if (cart.length > 0 && cart[0].image) {
    imageEl.src = cart[0].image;
    imageEl.alt = cart[0].name || "Donut";
  } else {
    imageEl.src = "images/sample-donut.png";
    imageEl.alt = "Donut";
  }
} else {
  console.warn("Element with ID 'checkout-image' not found in the DOM.");
}




const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn !== "true") {
  window.location.href = "login.html"; 
}
