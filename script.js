import { auth } from "./firebase.js";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  sendEmailVerification 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const loginMsg = document.getElementById("login-msg");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// 이메일/비밀번호 로그인
document.getElementById("login-btn").addEventListener("click", async () => {
  loginMsg.textContent = "";
  try {
    const userCredential = await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    const user = userCredential.user;
    if (!user.emailVerified) {
      loginMsg.textContent = "이메일 인증 후 로그인 가능합니다.";
      return;
    }
    window.location.href = "home.html";
  } catch (error) {
    if (error.code === "auth/user-not-found") loginMsg.textContent = "가입된 계정이 없습니다.";
    else if (error.code === "auth/wrong-password") loginMsg.textContent = "비밀번호가 틀렸습니다.";
    else loginMsg.textContent = "로그인 실패: " + error.message;
  }
});

// 이메일/비밀번호 회원가입
document.getElementById("signup-btn").addEventListener("click", async () => {
  loginMsg.textContent = "";
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    await sendEmailVerification(userCredential.user);
    loginMsg.textContent = "회원가입 성공! 이메일 인증 후 로그인 가능합니다.";
    emailInput.value = "";
    passwordInput.value = "";
  } catch (error) {
    if (error.code === "auth/email-already-in-use") loginMsg.textContent = "이미 가입된 이메일입니다.";
    else loginMsg.textContent = "회원가입 실패: " + error.message;
  }
});

// Google 로그인
document.getElementById("google-btn").addEventListener("click", async () => {
  loginMsg.textContent = "";
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    window.location.href = "home.html";
  } catch (error) {
    loginMsg.textContent = "Google 로그인 실패: " + error.message;
  }
});
