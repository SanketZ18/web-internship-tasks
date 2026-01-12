async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

window.onload = function () {
    const email = localStorage.getItem("lastEmail");
    if (email) document.getElementById("loginId").value = email;
};

async function loginUser() {
    const loginId = document.getElementById("loginId").value.trim();
    const loginPassword = document.getElementById("loginPassword").value.trim();
    const error = document.getElementById("error");

    error.innerText = "";

    if (!loginId || !loginPassword) {
        error.innerText = "All fields are required";
        return;
    }

    const hashedPassword = await hashPassword(loginPassword);

    fetch("http://localhost:3000/users")
        .then(res => res.json())
        .then(users => {
            const user = users.find(
                u =>
                    (u.email === loginId || u.phone === loginId) &&
                    u.password === hashedPassword
            );

            if (!user) {
                error.innerText = "Invalid email/phone or password";
                return;
            }

            localStorage.setItem("loggedInUser", JSON.stringify(user));
            window.location.href = "user.html";
        })
        .catch(() => error.innerText = "Server error");
}
