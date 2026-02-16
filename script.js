import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged
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

// 🔥 한국어 에러 변환
function getKoreanErrorMessage(error) {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "이미 가입된 이메일입니다.";
    case "auth/invalid-email":
      return "올바른 이메일 형식이 아닙니다.";
    case "auth/weak-password":
      return "비밀번호는 6자 이상이어야 합니다.";
    case "auth/user-not-found":
      return "존재하지 않는 계정입니다.";
    case "auth/wrong-password":
      return "비밀번호가 올바르지 않습니다.";
    default:
      return "오류가 발생했습니다. 다시 시도해주세요.";
  }
}

// ✅ 로그인
loginBtn?.addEventListener("click", () => {
  const { email, password } = getInput();

  signInWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "home.html")
    .catch(e => msg.innerText = getKoreanErrorMessage(e));
});

// ✅ 회원가입 (이미 존재하면 자동 로그인)
signupBtn?.addEventListener("click", async () => {
  const { email, password } = getInput();

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = "home.html";
  } catch (error) {

    if (error.code === "auth/email-already-in-use") {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "home.html";
      } catch (loginError) {
        msg.innerText = "이미 가입된 이메일입니다. 비밀번호를 확인하세요.";
      }
    } else {
      msg.innerText = getKoreanErrorMessage(error);
    }

  }
});

// ✅ 구글 로그인 (GitHub Pages 대응)
googleBtn?.addEventListener("click", () => {
  signInWithRedirect(auth, provider);
});

// ✅ 리디렉트 결과 처리
getRedirectResult(auth).then(result => {
  if (result?.user) {
    window.location.href = "home.html";
  }
});

// ✅ 로그인 상태 유지
onAuthStateChanged(auth, user => {
  if (user && window.location.pathname.includes("index.html")) {
    window.location.href = "home.html";
  }
});
