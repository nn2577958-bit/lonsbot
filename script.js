// Firebase 설정
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// DOM 요소 가져오기
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const signupMsg = document.getElementById("signup-msg");
const loginMsg = document.getElementById("login-msg");

// 회원가입
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      signupMsg.style.color = "green";
      signupMsg.textContent = "회원가입 성공! 로그인 해주세요.";
      signupForm.reset();
    })
    .catch((error) => {
      signupMsg.style.color = "red";
      signupMsg.textContent = error.message;
    });
});

// 로그인
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      loginMsg.style.color = "green";
      loginMsg.textContent = "로그인 성공!";
      loginForm.reset();
    })
    .catch((error) => {
      loginMsg.style.color = "red";
      loginMsg.textContent = error.message;
    });
});

// 로그인 상태 확인
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("로그인 상태:", user.email);
  } else {
    console.log("로그아웃 상태");
  }
});
