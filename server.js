import express from "express";
import admin from "firebase-admin";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
  })
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

// =====================
// 구글 로그인 토큰 검증
// =====================
app.post("/auth/google", async (req, res) => {
  const { idToken } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const isAdmin = decodedToken.email === "nn2577958@gmail.com";
    res.json({ uid: decodedToken.uid, email: decodedToken.email, isAdmin });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "유효하지 않은 토큰" });
  }
});

// =====================
// Firestore 예시 API
// =====================
app.get("/user/:uid", async (req, res) => {
  try {
    const doc = await db.collection("users").doc(req.params.uid).get();
    if(!doc.exists) return res.status(404).json({ error: "유저 없음" });
    res.json(doc.data());
  } catch(err) {
    res.status(500).json({ error: "서버 에러" });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Server running"));
