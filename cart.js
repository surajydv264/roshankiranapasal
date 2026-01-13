// 1. Detect the logged-in user from LocalStorage
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if (!loggedUser) {
    // If no user is detected, redirect to login
    alert("Please login to view your cart.");
    window.location.href = "login.html";
} else {
    // 2. Use the detected email to define the cart key
    const userEmail = loggedUser.email;
    const cartKey = `cart_${userEmail}`;
    
    console.log("Logged in as:", userEmail);
    
    // Now load the cart items automatically
    loadCartItems(cartKey);
}

function renderCart() {
    // Detect user again to be safe
    let user = JSON.parse(localStorage.getItem("loggedUser"));
    let cart = JSON.parse(localStorage.getItem("cart_" + user.email)) || [];
    
    let table = document.getElementById("cart");
    let total = 0;
    
    // Clear and add headers
    table.innerHTML = `<tr><th>Product</th><th>Quantity</th><th>Price</th><th>Action</th></tr>`;

    cart.forEach((item, index) => {
        let itemTotal = item.qty * item.price;
        total += itemTotal;
        
        table.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>
                    <button onclick="changeQty(${index}, -1)">-</button>
                    ${item.qty}
                    <button onclick="changeQty(${index}, 1)">+</button>
                </td>
                <td>Rs. ${itemTotal}</td>
                <td><button onclick="removeItem(${index})" style="color:red;">Delete</button></td>
            </tr>`;
    });

    document.getElementById("total").innerText = "Total: Rs. " + total;
}