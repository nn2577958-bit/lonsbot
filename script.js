import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

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

// DOM 요소
const logoutBtn = document.getElementById("logout-btn");

// 로그아웃 처리
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "index.html"; // 로그아웃 후 로그인 화면으로 리디렉션
    });
  });
}

// 로그인 상태 확인 및 화면 전환
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "index.html";  // 로그인하지 않으면 로그인 화면으로 리디렉션
  }
});
