// Firebase v9 모듈 방식
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Firebase 초기화
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

// DOM 요소
const authCard = document.getElementById("auth-card");
const mainCard = document.getElementById("main-card");
const signupForm = document.getElementById("signup-form");
const signupMsg = document.getElementById("signup-msg");
const loginForm = document.getElementById("login-form");
const loginMsg = document.getElementById("login-msg");
const googleBtn = document.getElementById("google-login");
const googleMsg = document.getElementById("google-msg");
const logoutBtn = document.getElementById("logout-btn");

// 회원가입
signupForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value.trim();
  const pw = document.getElementById("signup-password").value;

  if (pw.length < 6) {
    signupMsg.innerText = "비밀번호는 최소 6자 이상이어야 합니다.";
    signupMsg.className = "error";
    return;
  }

  createUserWithEmailAndPassword(auth, email, pw)
    .then(() => {
      signupMsg.innerText = "회원가입 완료! 로그인 해주세요.";
      signupMsg.className = "";
      signupForm.reset();
    })
    .catch(err => {
      if(err.code === "auth/email-already-in-use") {
        signupMsg.innerText = "이미 가입된 이메일입니다. 로그인 해주세요.";
      } else {
        signupMsg.innerText = err.message;
      }
      signupMsg.className = "error";
    });
});

// 이메일 로그인
loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const pw = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, pw)
    .then(() => {
      loginMsg.innerText = "로그인 성공!";
      loginMsg.className = "";
      loginForm.reset();
    })
    .catch(err => {
      loginMsg.innerText = err.message;
      loginMsg.className = "error";
    });
});

// Google 로그인
googleBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;
      googleMsg.innerText = `로그인 성공! ${user.displayName || "사용자"} (${user.email})`;
      googleMsg.className = "";
    })
    .catch(err => {
      googleMsg.innerText = err.message;
      googleMsg.className = "error";
    });
});

// 로그아웃
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    alert("로그아웃 완료!");
  });
});

// 로그인 상태 감지
onAuthStateChanged(auth, user => {
  if (user) {
    authCard.style.display = "none";
    mainCard.style.display = "block";
  } else {
    authCard.style.display = "block";
    mainCard.style.display = "none";
  }
});
