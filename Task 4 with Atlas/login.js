const p=new URLSearchParams(location.search);
email.value=p.get("email")||"";
async function login(){
const r=await fetch("http://localhost:3000/login",{
method:"POST",headers:{"Content-Type":"application/json"},
body:JSON.stringify({email:email.value,password:password.value})
});
const o=await r.json();
o.success?(localStorage.setItem("user",JSON.stringify(o.user)),location.href="user.html")
:error.innerText=o.msg;
}
function goBack() {
  location.href ="index.html";
}
function togglePassword() {
  password.type = password.type === "password" ? "text" : "password";
}
