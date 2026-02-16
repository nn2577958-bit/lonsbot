import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

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

const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const googleBtn = document.getElementById("google-btn");
const msg = document.getElementById("login-msg");

function getInput() {
  return {
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value
  };
}

// 로그인
loginBtn?.addEventListener("click", () => {
  const { email, password } = getInput();
  signInWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "home.html")
    .catch(e => msg.innerText = e.message);
});

// 회원가입
signupBtn?.addEventListener("click", () => {
  const { email, password } = getInput();
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "home.html")
    .catch(e => msg.innerText = e.message);
});

// 구글 로그인 (GitHub Pages 안전용 redirect)
googleBtn?.addEventListener("click", () => {
  signInWithRedirect(auth, provider);
});

// 리디렉트 결과 처리
getRedirectResult(auth).then(result => {
  if (result?.user) {
    window.location.href = "home.html";
  }
});

// 로그인 상태 유지
onAuthStateChanged(auth, user => {
  if (user && window.location.pathname.includes("index.html")) {
    window.location.href = "home.html";
  }
});
