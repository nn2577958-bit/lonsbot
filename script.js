<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LONS SV 공식 홈페이지</title>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    #auth-section { margin: 20px 0; padding: 20px; border: 1px solid #ccc; border-radius: 10px; }
    #auth-section input { display: block; width: 100%; margin-bottom: 10px; padding: 8px; }
    #auth-section button { padding: 8px 16px; margin-bottom: 10px; }
    #auth-section p { margin: 5px 0; }
    #auth-section p.error { color: red; }

    #scrollTopBtn {
      position: fixed; bottom: 20px; right: 20px; padding: 10px 15px; font-size: 14px;
      border-radius: 5px; background-color: #333; color: #fff; border: none; cursor: pointer; display: none; z-index: 1000;
    }
  </style>
</head>
<body>
  <header>
    <h1>LONS SV Palworld</h1>
    <p>꿀팁 & 커뮤니티 & 팰월드 정보 아래를 클릭해주세요!</p>
  </header>

  <main>
    <section id="auth-section">
      <div id="forms-section">
        <h2>회원가입</h2>
        <form id="signup-form">
          <input type="email" id="signup-email" placeholder="이메일" required />
          <input type="password" id="signup-password" placeholder="비밀번호 (최소 6자)" required />
          <button type="submit">회원가입</button>
        </form>
        <p id="signup-msg"></p>

        <h2>로그인</h2>
        <form id="login-form">
          <input type="email" id="login-email" placeholder="이메일" required />
          <input type="password" id="login-password" placeholder="비밀번호" required />
          <button type="submit">로그인</button>
        </form>
        <p id="login-msg"></p>
      </div>
    </section>

    <a id="invite-btn" href="https://discord.gg/tnMXbQ65Hk" target="_blank">디스코드 바로가기</a>

    <section class="features">
      <h2>주요 기능</h2>
      <ul>
        <li>실시간 알림 & 다양한 소식 & 정보</li>
        <li>공지사항 꿀팁 정보 얻어 보세요!</li>
        <li>02월 20일 새로운 하드코어 OPEN</li>
      </ul>
    </section>
  </main>

  <footer>
    <p>© 2026 LONS SV ONLINE</p>
  </footer>

  <button id="scrollTopBtn">▲ 맨 위로</button>

  <!-- 🔹 Firebase v8 CDN -->
  <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      // Firebase 초기화
      const firebaseConfig = {
        apiKey: "AIzaSyCyiAepd539cBTPwtcVnAR-HJbb8roLJmE",
        authDomain: "lons-dc24d.firebaseapp.com",
        projectId: "lons-dc24d",
        storageBucket: "lons-dc24d.firebasestorage.app",
        messagingSenderId: "755692328918",
        appId: "1:755692328918:web:a4eb4563cb862d3eb5b677",
        measurementId: "G-NCE37YM3LF"
      };
      firebase.initializeApp(firebaseConfig);
      const auth = firebase.auth();

      // DOM 요소
      const signupForm = document.getElementById("signup-form");
      const signupMsg = document.getElementById("signup-msg");
      const loginForm = document.getElementById("login-form");
      const loginMsg = document.getElementById("login-msg");

      // 회원가입
      signupForm.addEventListener("submit", e => {
        e.preventDefault();
        const email = document.getElementById("signup-email").value;
        const pw = document.getElementById("signup-password").value;

        if(pw.length < 6){
          signupMsg.innerText = "비밀번호는 최소 6자 이상이어야 합니다.";
          signupMsg.className = "error";
          return;
        }

        auth.createUserWithEmailAndPassword(email, pw)
          .then(() => {
            signupMsg.innerText = "회원가입 완료! 자동 로그인 됩니다.";
            signupMsg.className = "";
            loginMsg.innerText = "";
          })
          .catch(err => { signupMsg.innerText = err.message; signupMsg.className = "error"; });
      });

      // 로그인
      loginForm.addEventListener("submit", e => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const pw = document.getElementById("login-password").value;

        auth.signInWithEmailAndPassword(email, pw)
          .then(() => { loginMsg.innerText = "로그인 성공!"; loginMsg.className = ""; })
          .catch(err => { loginMsg.innerText = err.message; loginMsg.className = "error"; });
      });

      // 맨 위로 버튼
      const scrollBtn = document.getElementById("scrollTopBtn");
      window.onscroll = () => {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
          scrollBtn.style.display = "block";
        } else { scrollBtn.style.display = "none"; }
      };
      scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  </script>
</body>
</html>
