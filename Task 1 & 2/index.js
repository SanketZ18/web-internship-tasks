function registerUser() {
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const pincode = document.getElementById("pincode").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("error");

    error.innerText = "";

    if (!name || !age || !phone || !email || !address || !pincode || !password) {
        error.innerText = "All fields are required";
        return;
    }

    if (age < 18 || age > 60) {
        error.innerText = "Age must be between 18 and 60";
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        error.innerText = "Phone must be 10 digits";
        return;
    }

    if (!/^[0-9]{6}$/.test(pincode)) {
        error.innerText = "Pincode must be 6 digits";
        return;
    }

    if (password.length < 6) {
        error.innerText = "Password must be at least 6 characters";
        return;
    }

    const user = { name, age, phone, email, address, pincode, password };

    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("lastEmail", email);

    window.location.href = "login.html";
}
