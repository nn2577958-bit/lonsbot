const googleBtn = document.getElementById("google-btn");
const adminStatus = document.getElementById("admin-status");
const discordBtn = document.getElementById("discord-btn");
const loginMsg = document.getElementById("login-msg");

let opacity = 1;
let fadingOut = true;

function updateAdminClock(isAdmin){
  const now = new Date();
  const kstString = now.toLocaleString("ko-KR",{hour12:false, timeZone:"Asia/Seoul"});
  adminStatus.innerHTML = `${isAdmin ? "🟢 관리자 온라인" : "🔴 관리자 오프라인"}<br>${kstString}`;
  if(fadingOut){ opacity -= 0.05; if(opacity<=0){ opacity=0; fadingOut=false;} }
  else { opacity += 0.05; if(opacity>=1){ opacity=1; fadingOut=true;} }
}

setInterval(()=>updateAdminClock(!discordBtn.classList.contains('disabled')),1000);

googleBtn.addEventListener("click", () => {
  google.accounts.id.initialize({
    client_id: "755692328918-rncbloi5oh3tj9kh4nauhurihui1ohfp.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });
  google.accounts.id.prompt();
});

function handleCredentialResponse(response){
  if(!response.credential){
    loginMsg.textContent = "로그인 실패!";
    return;
  }

  // ✅ 반드시 Node.js 서버 도메인으로 변경
  fetch("https://lons-server.fly.dev/auth/google", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ idToken: response.credential })
  })
  .then(res => res.json())
  .then(data => {
    if(data.isAdmin){
      discordBtn.classList.remove("disabled");
      discordBtn.removeAttribute("data-tooltip");
      loginMsg.textContent = "관리자 로그인 성공! 디스코드 참여 버튼 활성화됨.";
    } else {
      loginMsg.textContent = "로그인 성공! 일반 사용자입니다.";
    }
  })
  .catch(err => {
    console.error(err);
    loginMsg.textContent = "서버 인증 실패!";
  });
}

discordBtn.addEventListener("click", ()=>{
  if(discordBtn.classList.contains('disabled')){
    loginMsg.textContent="로그인 후 참여하기 버튼이 활성화됩니다!";
    return;
  }
  loginMsg.textContent="잠시 후 홈으로 이동합니다...";
  setTimeout(()=>window.location.href="home.html",1500);
});
