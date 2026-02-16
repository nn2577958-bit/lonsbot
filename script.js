// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyCyiAepd539cBTPwtcVnAR-HJbb8roLJmE",
  authDomain: "lons-dc24d.firebaseapp.com",
  projectId: "lons-dc24d",
  storageBucket: "lons-dc24d.appspot.com",
  messagingSenderId: "755692328918",
  appId: "1:755692328918:web:a4eb4563cb862d3eb5b677"
};

// 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// HTML 요소
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const googleBtn = document.getElementById("google-btn");
const loginMsg = document.getElementById("login-msg");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// 로그인 이벤트
loginBtn.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (!userCredential.user.emailVerified) {
      loginMsg.textContent = "❌ 이메일 인증이 필요합니다. 메일함을 확인하세요.";
      return;
    }
    loginMsg.textContent = "";
    window.location.href = "home.html"; // 로그인 성공 후 홈으로
  } catch (error) {
    loginMsg.textContent = "❌ 로그인 실패: " + error.message;
  }
});

// 회원가입 이벤트
signupBtn.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    loginMsg.textContent = "✅ 회원가입 성공! 이메일을 확인하세요.";
    emailInput.value = "";
    passwordInput.value = "";
  } catch (error) {
    loginMsg.textContent = "❌ 회원가입 실패: " + error.message;
  }
});

// Google 로그인 이벤트
googleBtn.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    if (!user.emailVerified) {
      loginMsg.textContent = "❌ Google 계정 이메일 확인 필요.";
      return;
    }
    window.location.href = "home.html"; // 로그인 성공 후 홈으로
  } catch (error) {
    loginMsg.textContent = "❌ Google 로그인 실패: " + error.message;
  }
});

// 로그인 상태 확인 (자동 리다이렉트)
onAuthStateChanged(auth, user => {
  if (user && user.emailVerified) {
    window.location.href = "home.html";
  }
});
