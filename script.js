// 로그인
loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const pw = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, pw)
    .then(() => {
      window.location.href = "home.html"; // 로그인 후 home.html로 이동
    })
    .catch(err => {
      loginMsg.innerText = err.message;
      loginMsg.className = "error";
    });
});
