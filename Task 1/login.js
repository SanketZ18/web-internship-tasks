window.onload = function () {
    let hint = localStorage.getItem("loginHint");
    if (hint) {
        document.getElementById("loginId").value = hint;
    }
};

function loginUser() {

    let loginId = document.getElementById("loginId").value.trim();
    let loginPassword = document.getElementById("loginPassword").value;

    if (loginId === "" || loginPassword === "") {
        document.getElementById("error").innerText =
            "All fields are required";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.length === 0) {
        alert("No users registered. Please register first.");
        window.location.href = "register.html";
        return;
    }

    let matchedUser = users.find(u =>
        (u.email === loginId || u.phone === loginId) &&
        u.password === loginPassword
    );

    if (matchedUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
        window.location.href = "user.html";
    } else {
        document.getElementById("error").innerText =
            "Invalid Email/Phone or Password";
    }
}
