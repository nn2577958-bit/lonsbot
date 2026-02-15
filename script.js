// Firebase 초기화
const firebaseConfig = {
  apiKey: "AIzaSyCyiAepd539cBTPwtcVnAR-HJbb8roLJmE",
  authDomain: "lons-dc24d.firebaseapp.com",
  projectId: "lons-dc24d",
  storageBucket: "lons-dc24d.firebasestorage.app",
  messagingSenderId: "755692328918",
  appId: "1:755692328918:web:a4eb4563cb862d3eb5b677"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// DOM
const signupForm = document.getElementById("signup-form");
const signupMsg = document.getElementById("signup-msg");
const loginForm = document.getElementById("login-form");
const loginMsg = document.getElementById("login-msg");

const authSection = document.getElementById("auth-section");
const boardSection = document.getElementById("board-section");
const userEmail = document.getElementById("user-email");
const logoutBtn = document.getElementById("logout-btn");
const submitBtn = document.getElementById("submit-post");
const postsDiv = document.getElementById("posts");

// 회원가입
signupForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const pw = document.getElementById("signup-password").value;
  if(pw.length < 6){ signupMsg.innerText = "비밀번호는 최소 6자 이상"; return; }
  auth.createUserWithEmailAndPassword(email,pw)
    .then(() => { signupMsg.innerText=""; })
    .catch(err => { signupMsg.innerText = err.message; });
});

// 로그인
loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const pw = document.getElementById("login-password").value;
  auth.signInWithEmailAndPassword(email,pw)
    .then(() => { loginMsg.innerText=""; })
    .catch(err => { loginMsg.innerText = err.message; });
});

// 로그인 상태 확인
auth.onAuthStateChanged(user => {
  if(user){
    authSection.style.display = "none";
    boardSection.style.display = "block";
    userEmail.innerText = `로그인 계정: ${user.email}`;
    loadPosts();
  } else {
    authSection.style.display = "block";
    boardSection.style.display = "none";
  }
});

// 로그아웃
logoutBtn.addEventListener("click", () => {
  auth.signOut();
});

// 게시글 작성
submitBtn.addEventListener("click", () => {
  const title = document.getElementById("post-title").value.trim();
  const content = document.getElementById("post-content").value.trim();
  const user = auth.currentUser;
  if(!title||!content) return alert("제목과 내용을 입력해주세요.");

  db.collection("posts").add({
    author: user.email,
    title: title,
    content: content,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(()=> {
    document.getElementById("post-title").value="";
    document.getElementById("post-content").value="";
    loadPosts();
  });
});

// 게시글 불러오기
function loadPosts(){
  postsDiv.innerHTML="";
  db.collection("posts").orderBy("createdAt","desc").get().then(snapshot=>{
    snapshot.forEach(doc=>{
      const data = doc.data();
      const div = document.createElement("div");
      div.className="post";
      div.innerHTML=`<strong>${data.title}</strong><br>${data.content}<br><small>${data.author}</small>`;
      postsDiv.appendChild(div);
    });
  });
}
