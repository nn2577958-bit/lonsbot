import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Firebase 설정
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

// DOM
const signupForm = document.getElementById("signup-form");
const signupMsg = document.getElementById("signup-msg");
const loginForm = document.getElementById("login-form");
const loginMsg = document.getElementById("login-msg");
const authSection = document.getElementById("auth-section");
const mainSection = document.getElementById("main-section");
const logoutBtn = document.getElementById("logout-btn");

// 회원가입
signupForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value.trim();
  const pw = document.getElementById("signup-password").value;
  if(pw.length < 6){ signupMsg.innerText = "비밀번호는 최소 6자 이상"; return; }

  createUserWithEmailAndPassword(auth, email, pw)
    .then(() => { signupMsg.innerText="회원가입 완료! 로그인해주세요."; signupForm.reset(); })
    .catch(err => { 
      if(err.code === "auth/email-already-in-use"){ signupMsg.innerText="이미 가입된 이메일입니다."; }
      else { signupMsg.innerText = err.message; }
    });
});

// 로그인
loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const pw = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, pw)
    .then(() => { loginForm.reset(); })
    .catch(err => { loginMsg.innerText = err.message; });
});

// 로그아웃
logoutBtn.addEventListener("click", () => {
  signOut(auth);
});

// 로그인 상태 감지
onAuthStateChanged(auth, user => {
  if(user){
    authSection.style.display = "none";
    mainSection.style.display = "block";
  } else {
    authSection.style.display = "block";
    mainSection.style.display = "none";
  }
});
