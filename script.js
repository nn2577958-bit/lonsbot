import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Firebase 인증 처리
const auth = getAuth();

// 로그아웃 버튼 처리
const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      // 로그아웃 후 index.html로 이동
      window.location.href = "index.html";
    }).catch((error) => {
      console.error("로그아웃 실패: ", error);
    });
  });
}
