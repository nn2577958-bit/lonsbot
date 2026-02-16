import express from "express";
import admin from "firebase-admin";
import bodyParser from "body-parser";

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(bodyParser.json());

const ADMIN_EMAIL = "nn2577958@gmail.com";

app.post("/api/check-admin", async (req,res)=>{
  const {idToken} = req.body;
  try{
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const isAdmin = decodedToken.email === ADMIN_EMAIL;
    res.json({isAdmin});
  }catch(e){
    res.json({isAdmin:false});
  }
});

app.listen(3000,()=>console.log("Server running on port 3000"));
