let loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedUser) {
    window.location.href = "login.html";
}

document.getElementById("name").innerText = loggedUser.name;
document.getElementById("age").innerText = loggedUser.age;
document.getElementById("phone").innerText = loggedUser.phone;
document.getElementById("email").innerText = loggedUser.email;
document.getElementById("address").innerText = loggedUser.address;
document.getElementById("pincode").innerText = loggedUser.pincode;

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}
