// script.js

const googleBtn = document.getElementById("google-btn");
const discordBtn = document.getElementById("discord-btn");
const adminStatus = document.getElementById("admin-status");
const loginMsg = document.getElementById("login-msg");

let opacity = 1;
let fadingOut = true;

// 관리자 상태 시계 + 깜빡임
function updateAdminClock(isAdmin) {
  const now = new Date();
  const kstString = now.toLocaleString("ko-KR", { hour12:false, timeZone:"Asia/Seoul" });
  adminStatus.innerHTML = `${isAdmin ? "🟢 관리자 온라인" : "🔴 관리자 오프라인"}<br>${kstString}`;
  
  if(fadingOut) {
    opacity -= 0.05;
    if(opacity <= 0){ opacity = 0; fadingOut = false; }
  } else {
    opacity += 0.05;
    if(opacity >= 1){ opacity = 1; fadingOut = true; }
  }
  adminStatus.style.opacity = opacity;
}

// 1초마다 시계 갱신
setInterval(() => updateAdminClock(!discordBtn.classList.contains('disabled')), 1000);

// ===== 구글 로그인 버튼 클릭 =====
googleBtn.addEventListener("click", () => {
  // Google Identity Services 초기화
  google.accounts.id.initialize({
    client_id: "YOUR_GOOGLE_CLIENT_ID", // 여기에 Firebase 웹 클라이언트 ID
    callback: handleCredentialResponse
  });

  // One Tap UI 실행
  google.accounts.id.prompt();
});

// ===== 로그인 응답 처리 =====
function handleCredentialResponse(response) {
  if(!response.credential){
    loginMsg.textContent = "로그인 실패!";
    return;
  }

  // 서버로 ID 토큰 전송
  fetch("/auth/google", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken: response.credential })
  })
  .then(res => res.json())
  .then(data => {
    if(data.isAdmin){
      discordBtn.classList.remove("disabled");
      discordBtn.removeAttribute("data-tooltip");
      loginMsg.textContent = "관리자 로그인 성공! 디스코드 버튼 활성화";
    } else {
      loginMsg.textContent = "로그인 성공! 일반 사용자입니다.";
    }
  })
  .catch(err => {
    console.error(err);
    loginMsg.textContent = "서버 인증 실패!";
  });
}

// ===== 디스코드 버튼 클릭 =====
discordBtn.addEventListener("click", () => {
  if(discordBtn.classList.contains('disabled')){
    loginMsg.textContent = "로그인 후 참여하기 버튼이 활성화됩니다!";
    return;
  }
  loginMsg.textContent = "잠시 후 홈으로 이동합니다...";
  setTimeout(() => window.location.href = "home.html", 1500);
});
