import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "./register";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: process.env.firebase_apiKey,
  authDomain: process.env.firebase_authDomain,
  projectId: process.env.firebase_projectId,
  storageBucket: process.env.firebase_storageBucket,
  messagingSenderId: process.env.firebase_messagingSenderId,
  appId: process.env.firebase_appId,
  measurementId: process.env.firebase_measurementId,
};

export async function upload(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    // TODO: upload to Firebase
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Cloud Storage and get a reference to the service
    const storage = getStorage(app);

    return res.json({ success: true, error: false });
  } catch (error) {
    console.error(error);
  }
}
