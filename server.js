import express from "express";
import admin from "firebase-admin";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors()); // 클라이언트 다른 포트에서 테스트 가능
app.use(express.json());

// ===== Firebase Admin 초기화 =====
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

const ADMIN_EMAIL = "nn2577958@gmail.com";

// ===== 구글 ID 토큰 검증 API =====
app.post("/auth/google", async (req, res) => {
  const { idToken } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const isAdmin = decoded.email === ADMIN_EMAIL;
    res.json({ uid: decoded.uid, email: decoded.email, isAdmin });
  } catch (err) {
    console.error("토큰 검증 실패:", err.message);
    res.status(401).json({ error: "유효하지 않은 토큰" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
