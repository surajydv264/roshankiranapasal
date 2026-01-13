// ================= REGISTER FUNCTION =================
function registerUser(event) {
    event.preventDefault();

    // get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // check password match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // get existing users from localStorage or empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check if email already exists
    const exists = users.some(user => user.email === email);
    if (exists) {
        alert("Email already registered. Try logging in.");
        return;
    }

    // create new user object
    const newUser = {
        name: name,
        email: email,
        phone: phone,
        password: password
    };

    // save user in localStorage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! You can now log in.");
    window.location = "login.html";
}

// ================= LOGIN FUNCTION =================
function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // get saved users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // find user with matching email and password
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem("loggedUser", JSON.stringify(user));
        alert("Login Successful");
        window.location = "index.html"; // redirect to home/shop page
    } else {
        alert("Invalid email or password");
    }
}

// ================= LOGOUT FUNCTION =================
function logoutUser() {
    localStorage.removeItem("loggedUser");
    window.location = "login.html";
}

// ================= CHECK IF LOGGED IN =================
function checkLoggedIn() {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user) {
        window.location = "login.html"; // redirect if not logged in
    }
}
