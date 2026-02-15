// Firebase v9 모듈 방식
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCyiAepd539cBTPwtcVnAR-HJbb8roLJmE",
  authDomain: "lons-dc24d.firebaseapp.com",
  projectId: "lons-dc24d",
  storageBucket: "lons-dc24d.appspot.com",
  messagingSenderId: "755692328918",
  appId: "1:755692328918:web:a4eb4563cb862d3eb5b677"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// DOM
const authCard = document.getElementById("auth-card");
const mainCard = document.getElementById("main-card");
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const googleBtn = document.getElementById("google-login");
const logoutBtn = document.getElementById("logout-btn");

// 회원가입
signupForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value.trim();
  const pw = document.getElementById("signup-password").value;
  if (pw.length < 6) return alert("비밀번호 6자 이상");

  createUserWithEmailAndPassword(auth, email, pw)
    .then(() => alert("회원가입 성공"))
    .catch(err => alert(err.message));
});

// 로그인
loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const pw = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, pw)
    .then(() => console.log("로그인 성공"))
    .catch(err => alert(err.message));
});

// Google 로그인
googleBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .catch(err => alert(err.message));
});

// 로그아웃
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => alert("로그아웃 완료"));
});

// 로그인 상태 감지
onAuthStateChanged(auth, user => {
  if (user) {
    authCard.style.display = "none";
    mainCard.style.display = "flex";
  } else {
    authCard.style.display = "flex";
    mainCard.style.display = "none";
  }
});
