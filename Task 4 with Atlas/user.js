// 🔐 Block direct access
if (!localStorage.getItem("user")) {
  location.href = "login.html";
}

/* ---------- DOM REFERENCES ---------- */
const name = document.getElementById("name");
const age = document.getElementById("age");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const address = document.getElementById("address");
const pincode = document.getElementById("pincode");
const msg = document.getElementById("msg");

/* ---------- PASSWORD POPUP DOM ---------- */
const popup = document.getElementById("popup");
const oldPass = document.getElementById("oldPass");
const newPass = document.getElementById("newPass");
const confirmCheck = document.getElementById("confirmCheck");
const passError = document.getElementById("passError");

/* ---------- LOGGED-IN USER ---------- */
let u = JSON.parse(localStorage.getItem("user"));

/* ---------- POPUP ---------- */
function openPopup() {
  passError.innerText = "";
  oldPass.value = "";
  newPass.value = "";
  confirmCheck.checked = false;
  popup.style.display = "flex";
}

function closePopup() {
  popup.style.display = "none";
}

/* ---------- CHANGE PASSWORD (MongoDB API) ---------- */
async function changePassword() {
  passError.innerText = "";

  if (!oldPass.value || !newPass.value) {
    passError.innerText = "All fields required";
    return;
  }

  if (newPass.value.length < 6) {
    passError.innerText = "Password must be at least 6 characters";
    return;
  }

  if (!confirmCheck.checked) {
    passError.innerText = "Please confirm checkbox";
    return;
  }

  try {
    const r = await fetch("http://localhost:3000/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: u._id,
        oldPassword: oldPass.value,
        newPassword: newPass.value
      })
    });

    const o = await r.json();

    if (!o.success) {
      passError.innerText = o.msg;
      return;
    }

    alert("Password changed successfully. Login again.");
    localStorage.clear();
    location.href = "login.html";

  } catch (err) {
    console.error(err);
    passError.innerText = "Server error. Please try again.";
  }
}

/* ---------- FILL PROFILE ---------- */
name.value = u.name;
age.value = u.age;
phone.value = u.phone;
email.value = u.email;
address.value = u.address;
pincode.value = u.pincode;

/* ---------- DISABLE PROFILE INPUTS ---------- */
document
  .querySelectorAll(".container input, .container textarea")
  .forEach(i => i.disabled = true);

/* ---------- ENABLE EDIT ---------- */
function enableEdit() {
  document
    .querySelectorAll(".container input, .container textarea")
    .forEach(i => {
      if (i.id !== "email") i.disabled = false;
    });
}

/* ---------- SAVE PROFILE ---------- */
async function save() {
  const r = await fetch("http://localhost:3000/update/" + u._id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.value.trim(),
      age: age.value.trim(),
      phone: phone.value.trim(),
      address: address.value.trim(),
      pincode: pincode.value.trim()
    })
  });

  const o = await r.json();
  msg.innerText = o.msg;

  document
    .querySelectorAll(".container input, .container textarea")
    .forEach(i => i.disabled = true);

  // Update localStorage
  u.name = name.value.trim();
  u.age = age.value.trim();
  u.phone = phone.value.trim();
  u.address = address.value.trim();
  u.pincode = pincode.value.trim();
  localStorage.setItem("user", JSON.stringify(u));
}

/* ---------- LOGOUT ---------- */
function logout() {
  localStorage.clear();
  location.href = "login.html";
}

/* ---------- DELETE ACCOUNT ---------- */
async function deleteAccount() {
  if (!confirm("Are you sure you want to delete your account?")) return;

  const r = await fetch("http://localhost:3000/delete/" + u._id, {
    method: "DELETE"
  });

  const o = await r.json();
  alert(o.msg);

  localStorage.clear();
  location.href = "index.html";
}
