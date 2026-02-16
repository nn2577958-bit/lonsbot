import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCyiAepd539cBTPwtcVnAR-HJbb8roLJmE",
  authDomain: "lons-dc24d.firebaseapp.com",
  projectId: "lons-dc24d",
  storageBucket: "lons-dc24d.firebasestorage.app",
  messagingSenderId: "755692328918",
  appId: "1:755692328918:web:a4eb4563cb862d3eb5b677"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginForm = document.getElementById("login-form");
const loginMsg = document.getElementById("login-msg");
const logoutBtn = document.getElementById("logout-btn");
const googleBtn = document.getElementById("google-login-btn");

// 이메일 로그인
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const pw = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, pw)
      .then(() => {
        window.location.href = "home.html";
      })
      .catch(err => {
        loginMsg.innerText = err.message;
        loginMsg.className = "error";
      });
  });
}

// 구글 로그인
if (googleBtn) {
  googleBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then(() => {
        window.location.href = "home.html";
      })
      .catch(error => {
        loginMsg.innerText = error.message;
        loginMsg.className = "error";
      });
  });
}

// 로그아웃
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "index.html";
    });
  });
}

// 로그인 상태 확인
onAuthStateChanged(auth, user => {
  const currentPage = window.location.pathname;

  if (!user && currentPage.includes("home.html")) {
    window.location.href = "index.html";
  }
});
