document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const switchFormLinks = document.querySelectorAll('.switch-form');
  
    switchFormLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (link.textContent === 'Sign Up') {
          container.classList.remove('active-login');
          container.classList.add('active-signup');
        } else {
          container.classList.remove('active-signup');
          container.classList.add('active-login');
        }
      });
    });
  });
  
  function showToast(message) {
    const toast = document.getElementById("toast-message");
    toast.querySelector(".toast-message").textContent = message;
    toast.classList.add("show");
  
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
  
  function signup() {
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
  
    if (!email || !password) {
      showToast("⚠️ Please fill in all fields.");
      return;
    }
  
    let users = JSON.parse(localStorage.getItem("users")) || [];
  
    if (users.find(user => user.email === email)) {
      showToast("❌ Email already exists!");
      return;
    }
  
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
  
    showToast("✅ Signup successful! You can now log in.");
  
    document.querySelector('.container').classList.remove('active-signup');
    document.querySelector('.container').classList.add('active-login');
  }
  
  
  function showToast(message, type = "info") {
    const toast = document.getElementById("toast-message");
    toast.querySelector(".toast-message").textContent = message;
  
    
    if (type === "success") {
      toast.style.background = "#28a745"; 
    } else if (type === "error") {
      toast.style.background = "#dc3545"; 
    } else {
      toast.style.background = "#333"; 
    }
  
    toast.classList.add("show");
  
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
  
  function login() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
  
    let users = JSON.parse(localStorage.getItem("users")) || [];
  
    const user = users.find(user => user.email === email && user.password === password);
  
    if (user) {
      localStorage.setItem("loggedInUser", email);
      showToast("✅ Login successful!", "success");
      setTimeout(() => {
        window.location.href = "donutso/index.html";
      }, 1000); 
    } else {
      showToast("❌ Invalid email or password.", "error");
    }
  }
  
  
  localStorage.setItem("isLoggedIn", "true");


  