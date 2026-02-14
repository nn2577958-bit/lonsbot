const inviteButton = document.getElementById("invite-btn");

if (inviteButton) {
  inviteButton.addEventListener("click", (e) => {
    e.preventDefault(); // 링크 기본 이동 잠시 막기
    alert("오늘도 찾아 와주셔서 감사합니다"); // 안내 메시지
    window.location.href = "https://discord.gg/tnMXbQ65Hk"; // 메시지 확인 후 이동
  });
}
