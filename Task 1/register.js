function registerUser() {

    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value;
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let address = document.getElementById("address").value;
    let pincode = document.getElementById("pincode").value;
    let password = document.getElementById("password").value;

    if (name === "" || email === "" || password === "") {
        document.getElementById("error").innerText =
            "Name, Email and Password are required";
        return;
    }

    // Get existing users or empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check duplicate email or phone
    let userExists = users.some(u =>
        u.email === email || u.phone === phone
    );

    if (userExists) {
        document.getElementById("error").innerText =
            "User already registered with this Email or Phone";
        return;
    }

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

    // Auto-fill login
    localStorage.setItem("loginHint", email || phone);

    window.location.href = "login.html";
}
