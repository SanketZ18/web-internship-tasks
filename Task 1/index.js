function registerUser() {

    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let address = document.getElementById("address").value.trim();
    let pincode = document.getElementById("pincode").value.trim();
    let password = document.getElementById("password").value.trim();
    let error = document.getElementById("error");

    error.innerText = "";

    // Regex patterns
    let namePattern = /^[A-Za-z ]+$/;
    let phonePattern = /^[0-9]{10}$/;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let pincodePattern = /^[0-9]{6}$/;

    // Required fields check
    if (!name || !email || !password) {
        error.innerText = "Name, Email and Password are required";
        return;
    }

    // Name validation
    if (!namePattern.test(name)) {
        error.innerText = "Name should contain only letters";
        return;
    }

    // Age validation (optional field)
    if (age && (age < 1 || age > 120)) {
        error.innerText = "Enter a valid age";
        return;
    }

    // Phone validation
    if (phone && !phonePattern.test(phone)) {
        error.innerText = "Phone number must be exactly 10 digits";
        return;
    }

    // Email validation
    if (!emailPattern.test(email)) {
        error.innerText = "Enter a valid email address";
        return;
    }

    // Pincode validation
    if (pincode && !pincodePattern.test(pincode)) {
        error.innerText = "Pincode must be exactly 6 digits";
        return;
    }

    // Password validation
    if (password.length < 6) {
        error.innerText = "Password must be at least 6 characters";
        return;
    }

    // Get existing users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check duplicate email or phone
    let userExists = users.some(u =>
        u.email === email || (phone && u.phone === phone)
    );

    if (userExists) {
        error.innerText = "User already registered with this Email or Phone";
        return;
    }

    // Create new user object
    let newUser = {
        name,
        age,
        phone,
        email,
        address,
        pincode,
        password
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    // Auto-fill login hint
    localStorage.setItem("loginHint", email);

    alert("Registration Successful!");

    window.location.href = "login.html";
}
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("address").value = "";
    document.getElementById("pincode").value = "";
    document.getElementById("password").value = "";
    document.getElementById("error").innerText = "";
}
