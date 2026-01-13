// Slider
let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide() {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
    index = (index + 1) % slides.length;
}

setInterval(showSlide, 3000);

// Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});


// Get logged-in user
let user = JSON.parse(localStorage.getItem("loggedUser"));
if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
}

// Add to Cart button click
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

addToCartButtons.forEach(btn => {
    btn.addEventListener("click", function() {
        const name = this.dataset.name;
        const price = parseFloat(this.dataset.price);
        const qtyInput = this.previousElementSibling; // the input box
        const qty = parseInt(qtyInput.value);

        if(qty <= 0) {
            alert("Enter a valid quantity!");
            return;
        }

        // Get the cart for this user
        let cart = JSON.parse(localStorage.getItem("cart_" + user.email)) || [];

        // Check if product already exists
        const existingProduct = cart.find(item => item.name === name);
        if(existingProduct) {
            existingProduct.qty += qty;
        } else {
            cart.push({name, price, qty});
        }

        localStorage.setItem("cart_" + user.email, JSON.stringify(cart));

        alert(`${name} added to cart!`);
    });
});
// This script runs on your SHOP/PRODUCTS page
const addButtons = document.querySelectorAll(".add-to-cart");

addButtons.forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = parseInt(button.dataset.price);

    // 1. Get the logged-in user
    let user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user) {
      alert("Please login first!");
      location = "login.html";
      return;
    }

    // 2. Get the specific cart for this user
    const cartKey = "cart_" + user.email;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    // 3. Check if item already exists
    let product = cart.find(item => item.name === name);
    if (product) {
      product.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    // 4. Save back to localStorage
    localStorage.setItem(cartKey, JSON.stringify(cart));
    alert(`${name} added to cart!`);
  });
});


