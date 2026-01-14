// DOM references (VERY IMPORTANT)
const name = document.getElementById("name");
const age = document.getElementById("age");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const address = document.getElementById("address");
const pincode = document.getElementById("pincode");
const password = document.getElementById("password");
const error = document.getElementById("error");
const success = document.getElementById("success");

function validate() {

  if (
    name.value.trim() === "" ||
    age.value.trim() === "" ||
    phone.value.trim() === "" ||
    email.value.trim() === "" ||
    address.value.trim() === "" ||
    pincode.value.trim() === "" ||
    password.value.trim() === ""
  ) {
    return "All fields required";
  }

  // Phone validation
  if (!/^\d{10}$/.test(phone.value.trim())) {
    return "Phone must be exactly 10 digits";
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    return "Please enter a valid email address";
  }

  // Password validation
  if (password.value.length < 6) {
    return "Password must be at least 6 characters";
  }

  return "";
}

async function registerUser() {

  error.innerText = "";
  success.innerText = "";

  const msg = validate();
  if (msg) {
    error.innerText = msg;
    return;
  }

  try {
    const r = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value.trim(),
        age: age.value.trim(),
        phone: phone.value.trim(),
        email: email.value.trim(),
        address: address.value.trim(),
        pincode: pincode.value.trim(),
        password: password.value
      })
    });

    const o = await r.json();
    success.innerText = o.msg;

    setTimeout(() => {
      location.href = "login.html?email=" + encodeURIComponent(email.value.trim());
    }, 2000);

  } catch (e) {
    error.innerText = "Server error. Please try again later.";
  }
}
function togglePassword() {
  password.type = password.type === "password" ? "text" : "password";
}
