/* ---------- PASSWORD HASH FUNCTION ---------- */
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

/* ---------- REGISTER USER ---------- */
async function registerUser() {
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const pincode = document.getElementById("pincode").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("error");

    error.innerText = "";

    /* ---------- VALIDATIONS ---------- */
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

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        error.innerText = "Invalid email format";
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

    /* ---------- HASH PASSWORD ---------- */
    const hashedPassword = await hashPassword(password);

    const user = {
        name,
        age,
        phone,
        email,
        address,
        pincode,
        password: hashedPassword
    };

    /* ---------- POST API ---------- */
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(() => {
        localStorage.setItem("lastEmail", email);
        window.location.href = "login.html";
    })
    .catch(() => {
        error.innerText = "Server error. Please try again.";
    });
}
