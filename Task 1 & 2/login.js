window.onload = function () {
    const email = localStorage.getItem("lastEmail");
    if (email) {
        document.getElementById("loginId").value = email;
    }
};

function loginUser() {
    const loginId = document.getElementById("loginId").value.trim();
    const loginPassword = document.getElementById("loginPassword").value.trim();
    const error = document.getElementById("error");

    error.innerText = "";

    const user = JSON.parse(localStorage.getItem("userData"));

    if (!user) {
        error.innerText = "Please register first";
        return;
    }

    if (
        (loginId === user.email || loginId === user.phone) &&
        loginPassword === user.password
    ) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "user.html";
    } else {
        error.innerText = "Email/Phone or Password not match";
    }
}
