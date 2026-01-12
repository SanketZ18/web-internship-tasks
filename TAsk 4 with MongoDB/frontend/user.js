async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

/* ---------- LOAD USER ---------- */
const user = JSON.parse(localStorage.getItem("loggedInUser"));
if (!user) window.location.href = "login.html";

/* ---------- INPUTS ---------- */
const uName = document.getElementById("uName");
const uAge = document.getElementById("uAge");
const uPhone = document.getElementById("uPhone");
const uEmail = document.getElementById("uEmail");
const uAddress = document.getElementById("uAddress");
const uPincode = document.getElementById("uPincode");
const saveBtn = document.getElementById("saveBtn");

/* ---------- LOAD DATA ---------- */
uName.value = user.name;
uAge.value = user.age;
uPhone.value = user.phone;
uEmail.value = user.email;
uAddress.value = user.address;
uPincode.value = user.pincode;

/* ---------- ENABLE EDIT ---------- */
function enableEdit() {
    document.querySelectorAll("input, textarea").forEach(el => el.disabled = false);
    saveBtn.style.display = "block";
}

/* ---------- PUT API (UPDATE PROFILE) ---------- */
function saveProfile() {
    const updatedUser = {
        ...user,
        name: uName.value.trim(),
        age: uAge.value.trim(),
        phone: uPhone.value.trim(),
        email: uEmail.value.trim(),
        address: uAddress.value.trim(),
        pincode: uPincode.value.trim()
    };

    fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser)
    })
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("loggedInUser", JSON.stringify(data));
        alert("Profile updated successfully");
        location.reload();
    });
}

/* ---------- PASSWORD CHANGE ---------- */
const popup = document.getElementById("popup");
const oldPass = document.getElementById("oldPass");
const newPass = document.getElementById("newPass");
const confirmCheck = document.getElementById("confirmCheck");
const passError = document.getElementById("passError");

function openPopup() { popup.style.display = "flex"; }
function closePopup() { popup.style.display = "none"; }

/* ---------- PATCH API (PASSWORD) ---------- */
async function changePassword() {
    const oldHash = await hashPassword(oldPass.value.trim());
    const newHash = await hashPassword(newPass.value.trim());

    passError.innerText = "";

    if (!confirmCheck.checked) {
        passError.innerText = "Please confirm checkbox";
        return;
    }

    if (oldHash !== user.password) {
        passError.innerText = "Old password incorrect";
        return;
    }

    if (newPass.value.length < 6) {
        passError.innerText = "Password must be at least 6 characters";
        return;
    }

    fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newHash })
    })
    .then(() => {
        alert("Password changed successfully. Login again.");
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
    });
}

/* ---------- LOGOUT ---------- */
function logoutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}
