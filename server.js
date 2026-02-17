import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import path from 'path';

const app = express();
app.use(express.json());
const CLIENT_ID = "755692328918-rncbloi5oh3tj9kh4nauhurihui1ohfp.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

// 정적 파일 제공 (index.html, script.js 등)
app.use(express.static(path.join(process.cwd())));

// 구글 로그인 인증
app.post('/auth/google', async (req, res) => {
  const { idToken } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: CLIENT_ID
    });
    const payload = ticket.getPayload();

    // 관리자 이메일 지정
    const adminEmails = ["nn2577958@gmai.com"];
    const isAdmin = adminEmails.includes(payload.email);

    res.json({ isAdmin });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
