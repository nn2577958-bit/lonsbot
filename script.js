import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  getFirestore, collection, addDoc, getDocs, query, orderBy
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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
const db = getFirestore(app);

// DOM 요소
const signupForm = document.getElementById("signup-form");
const signupMsg = document.getElementById("signup-msg");
const loginForm = document.getElementById("login-form");
const loginMsg = document.getElementById("login-msg");
const postTitle = document.getElementById("post-title");
const postContent = document.getElementById("post-content");
const submitPost = document.getElementById("submit-post");
const postsDiv = document.getElementById("posts");

// 회원가입
signupForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value.trim();
  const pw = document.getElementById("signup-password").value;
  createUserWithEmailAndPassword(auth, email, pw)
    .then(() => {
      signupMsg.innerText = "회원가입 완료! 로그인 해주세요.";
      signupMsg.className = "";
      signupForm.reset();
    })
    .catch(err => {
      signupMsg.innerText = err.message;
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
      window.location.href = "home.html";
    })
    .catch(err => {
      loginMsg.innerText = err.message;
      loginMsg.className = "error";
    });
});

// 로그아웃
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "index.html";
    });
  });
}

// 로그인 상태 확인
onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById("user-info").innerText = `로그인 중: ${user.email}`;
    document.getElementById("forms-section").style.display = "none";
    document.getElementById("status-msg").innerText = `로그인 상태: ${user.email}`;
  } else {
    document.getElementById("user-info").style.display = "none";
    document.getElementById("forms-section").style.display = "block";
    document.getElementById("status-msg").innerText = "로그아웃 상태";
  }
});

// 게시글 작성
submitPost.addEventListener("click", () => {
  const title = postTitle.value.trim();
  const content = postContent.value.trim();
  const user = auth.currentUser;
  if (!title || !content) return alert("제목과 내용을 입력해주세요.");

  addDoc(collection(db, "posts"), {
    author: user.email,
    title: title,
    content: content,
    createdAt: new Date()
  }).then(() => {
    postTitle.value = "";
    postContent.value = "";
    loadPosts();
  }).catch(err => {
    alert("게시글 작성 실패: " + err.message);
  });
});

// 게시글 불러오기
function loadPosts() {
  postsDiv.innerHTML = "";
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  getDocs(q).then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `<strong>${data.title}</strong><br>${data.content}<br><small>${data.author}</small>`;
      postsDiv.appendChild(div);
    });
  }).catch(err => {
    alert("게시글 불러오기 실패: " + err.message);
  });
}
