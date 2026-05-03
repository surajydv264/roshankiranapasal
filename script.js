/* =======================
   DHANMANTRI MAIN SCRIPT
   CLEAN + FIXED VERSION
======================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ================= LOGIN SYSTEM ================= */

    window.openLogin = function () {
        let modal = document.getElementById("loginModal");
        if (modal) modal.style.display = "flex";
    };

    window.closeLogin = function () {
        let modal = document.getElementById("loginModal");
        if (modal) modal.style.display = "none";
    };

    window.showRegister = function () {
        let box = document.getElementById("registerBox");
        if (box) box.style.display = "block";
    };

    /* ================= REGISTER ================= */

    window.registerUser = function () {

        let user = {
            name: document.getElementById("rname")?.value,
            email: document.getElementById("remail")?.value,
            password: document.getElementById("rpass")?.value
        };

        if (!user.name || !user.email || !user.password) {
            alert("❌ Please fill all fields");
            return;
        }

        localStorage.setItem(user.email, JSON.stringify(user));

        alert("✅ Registration Successful!");
    };

    /* ================= LOGIN ================= */

    window.loginUser = function () {

        let name = document.getElementById("name")?.value;
        let email = document.getElementById("email")?.value;
        let password = document.getElementById("password")?.value;

        let data = localStorage.getItem(email);

        if (!data) {
            alert("❌ User not found!");
            return;
        }

        let user = JSON.parse(data);

        if (user.name === name && user.password === password) {
            alert("✅ Login Successful!");
            closeLogin();
        } else {
            alert("❌ Invalid details!");
        }
    };

    /* ================= CART SYSTEM ================= */

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    window.addToCart = function (name, price, image) {

        cart.push({ name, price: Number(price), image });

        localStorage.setItem("cart", JSON.stringify(cart));

        renderCart();
        updateCartCount();
    };

    window.removeItem = function (index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));

        renderCart();
        updateCartCount();
    };

    window.openCart = function () {
        let panel = document.getElementById("cartPanel");
        if (panel) panel.classList.add("active");

        renderCart();
    };

    window.closeCart = function () {
        let panel = document.getElementById("cartPanel");
        if (panel) panel.classList.remove("active");
    };

    function renderCart() {

        let cartBody = document.getElementById("cartBody");
        let totalPrice = document.getElementById("totalPrice");

        if (!cartBody || !totalPrice) return;

        if (cart.length === 0) {
            cartBody.innerHTML = "<tr><td colspan='4'>Cart is empty</td></tr>";
            totalPrice.innerText = "Total: Rs 0";
            return;
        }

        let total = 0;
        let html = "";

        cart.forEach((item, i) => {
            total += item.price;

            html += `
                <tr>
                    <td><img src="${item.image}" width="50"></td>
                    <td>${item.name}</td>
                    <td>Rs ${item.price}</td>
                    <td><button onclick="removeItem(${i})">Remove</button></td>
                </tr>
            `;
        });

        cartBody.innerHTML = html;
        totalPrice.innerText = "Total: Rs " + total;
    }

    function updateCartCount() {
        let count = document.getElementById("cartCount");
        if (count) count.innerText = cart.length;
    }

    /* ================= POPUP SYSTEM ================= */

    let popup = document.getElementById("popup");
    let acceptBtn = document.getElementById("acceptBtn");

    if (popup && acceptBtn) {

        if (!localStorage.getItem("firstVisitDone")) {
            popup.style.display = "flex";
        }

        acceptBtn.onclick = function () {
            localStorage.setItem("firstVisitDone", "true");
            popup.style.display = "none";
        };
    }

    /* ================= FORM ================= */

    let form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            alert("✅ Message Sent Successfully!");
            form.reset();
        });
    }

    /* ================= SLIDER ================= */

    let index = 0;
    let slides = document.querySelectorAll(".slide");
    let dotsContainer = document.getElementById("dots");

    if (slides.length > 0 && dotsContainer) {

        slides.forEach((_, i) => {
            let dot = document.createElement("span");
            dot.classList.add("dot");

            dot.onclick = () => showSlide(i);

            dotsContainer.appendChild(dot);
        });

        let dots = document.querySelectorAll(".dot");

        function showSlide(i) {
            slides.forEach(s => s.classList.remove("active"));
            dots.forEach(d => d.classList.remove("active"));

            slides[i].classList.add("active");
            dots[i].classList.add("active");

            index = i;
        }

        function autoSlide() {
            index = (index + 1) % slides.length;
            showSlide(index);
        }

        showSlide(0);
        setInterval(autoSlide, 3000);
    }

    /* ================= INIT ================= */

    renderCart();
    updateCartCount();

    console.log("✅ JS FULLY CONNECTED & WORKING");

});


document.addEventListener("DOMContentLoaded", function () {

    let popup = document.getElementById("popup");
    let acceptBtn = document.getElementById("acceptBtn");

    // ❗ If already accepted → NEVER show again
    if (localStorage.getItem("acceptedTerms") === "true") {
        if (popup) popup.style.display = "none";
        return;
    }

    // ❗ First visit only → show popup
    if (popup) {
        popup.style.display = "flex";
    }

    // ❗ Accept button
    if (acceptBtn) {
        acceptBtn.addEventListener("click", function () {
            localStorage.setItem("acceptedTerms", "true");
            popup.style.display = "none";
        });
    }

});


document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searchInput");
    const products = document.querySelectorAll(".product-card");
    const noResult = document.getElementById("noResult");

    if (!searchInput || products.length === 0) return;

    searchInput.addEventListener("input", function () {

        let value = this.value.toLowerCase();
        let found = false;

        products.forEach(product => {

            let title = product.querySelector("h3").innerText.toLowerCase();

            if (title.includes(value)) {
                product.style.display = "block";
                found = true;
            } else {
                product.style.display = "none";
            }

        });

        // SHOW / HIDE NO RESULT MESSAGE
        if (found) {
            noResult.style.display = "none";
        } else {
            noResult.style.display = "block";
        }

        // if empty search → show all
        if (value === "") {
            products.forEach(p => p.style.display = "block");
            noResult.style.display = "none";
        }

    });

});