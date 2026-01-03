const user = JSON.parse(localStorage.getItem("loggedInUser"));
if (!user) {
    window.location.href = "login.html";
}

// Load data
uName.value = user.name;
uAge.value = user.age;
uPhone.value = user.phone;
uEmail.value = user.email;
uAddress.value = user.address;
uPincode.value = user.pincode;

function enableEdit() {
    document.querySelectorAll("input, textarea").forEach(el => el.disabled = false);
    saveBtn.style.display = "block";
}

function saveProfile() {
    user.name = uName.value.trim();
    user.age = uAge.value.trim();
    user.phone = uPhone.value.trim();
    user.email = uEmail.value.trim();
    user.address = uAddress.value.trim();
    user.pincode = uPincode.value.trim();

    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert("Profile updated successfully");
    location.reload();
}

/* ---------- PASSWORD POPUP ---------- */

function openPopup() {
    popup.style.display = "flex";
}

function closePopup() {
    popup.style.display = "none";
}

function changePassword() {
    const oldP = oldPass.value.trim();
    const newP = newPass.value.trim();
    const checked = confirmCheck.checked;

    passError.innerText = "";

    if (!checked) {
        passError.innerText = "Please confirm the checkbox";
        return;
    }

    if (oldP !== user.password) {
        passError.innerText = "Old password incorrect";
        return;
    }

    if (newP.length < 6) {
        passError.innerText = "Password must be at least 6 characters";
        return;
    }

    user.password = newP;
    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.removeItem("loggedInUser");

    alert("Password changed successfully. Please login again.");
    window.location.href = "login.html";
}

/* ---------- LOGOUT ---------- */

function logoutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}
