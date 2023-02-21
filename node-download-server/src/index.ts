import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import express, { Application } from "express";
import { config } from "dotenv";
import { DownloaderHelper } from "node-downloader-helper";
import { v4 as uuidv4 } from "uuid";
import { readFileSync, unlinkSync } from "fs";
import firebaseApp from "./lib/firebase";
import path from "path";

config();

const PORT = process.env.PORT || 5000;

const app: Application = express();

app.use(express.json());

app.get("/api/download", (req: express.Request, res: express.Response) => {
  res.json({ success: "Hi world", error: false });
});

app.post(
  "/api/download",
  async (req: express.Request, res: express.Response) => {
    try {
      // TODO: download file from URL
      const { download_url } = req.body;

      const download = new DownloaderHelper(
        download_url,
        path.join(__dirname + "/downloads")
      );

      download.on("end", async (event) => {
        console.log("Download completed");
        const fileName = event.fileName;

        // TODO: upload to Firebase
        const storage = getStorage(firebaseApp);
        const storageRef = ref(
          storage,
          `/resumes/${process.env.UPLOAD_FOLDER}/${uuidv4()}.pdf`
        );

        const buffer = readFileSync(
          path.join(__dirname + `/downloads/${fileName}`)
        );

        const response = await uploadBytes(storageRef, buffer);
        if (!response) throw new Error("Upload to Firbase failed");

        const fileURL = await getDownloadURL(storageRef);

        // Delete file in /downloads
        unlinkSync(path.join(__dirname + `/downloads/${fileName}`));

        return res.json({ success: fileURL, error: false });
      });
      download.on("error", (err) => {
        throw err;
      });
      download.start();
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
