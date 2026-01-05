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

    if (!loginId || !loginPassword) {
        error.innerText = "All fields are required";
        return;
    }

    //  NEW: GET users from API
    fetch("http://localhost:3000/users")
        .then(res => res.json())
        .then(users => {
            if (users.length === 0) {
                error.innerText = "Please register first";
                return;
            }

            const user = users.find(
                u =>
                    (u.email === loginId || u.phone === loginId) &&
                    u.password === loginPassword
            );

            if (user) {
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                window.location.href = "user.html";
            } else {
                error.innerText = "Email/Phone or Password not match";
            }
        })
        .catch(() => {
            error.innerText = "Server error. Try again later.";
        });
}
