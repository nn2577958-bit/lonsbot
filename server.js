import express from "express";
import admin from "firebase-admin";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Firebase Admin 초기화
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

const db = admin.firestore();
const ADMIN_EMAIL = "nn2577958@gmail.com";

// ===== 구글 ID 토큰 검증 =====
app.post("/auth/google", async (req, res) => {
  const { idToken } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const isAdmin = decoded.email === ADMIN_EMAIL;
    res.json({ uid: decoded.uid, email: decoded.email, isAdmin });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "유효하지 않은 토큰" });
  }
});

// ===== 예시: Firestore 유저 데이터 =====
app.get("/user/:uid", async (req, res) => {
  try {
    const doc = await db.collection("users").doc(req.params.uid).get();
    if (!doc.exists) return res.status(404).json({ error: "유저 없음" });
    res.json(doc.data());
  } catch (err) {
    res.status(500).json({ error: "서버 에러" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
