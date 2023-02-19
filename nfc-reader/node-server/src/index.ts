import express, { Application } from "express";
import { config } from "dotenv";
import {
  checkIfCardBeenRead,
  validateCardSerialNumber,
  validateReader,
} from "./middlewares/middlewares";
import ReaderHistory from "./db/models/ReaderHistory";
import Recruiters from "./db/models/Recruiters";

config();

const app: Application = express();

const PORT = process.env.PORT || 3000;

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.get("/api/reader", (req: express.Request, res: express.Response) => {
  try {
    return res.json({ success: "hi world", error: false });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

app.post("/api/card", async (req: express.Request, res: express.Response) => {
  try {
    const { serial_number } = req.body;
    // TODO: generate 6 digit password (optional)
    //

    // TODO: save to DB
    //
  } catch (error) {
    console.error(error);
  }
});

app.post(
  "/api/reader",
  validateReader,
  validateCardSerialNumber,
  checkIfCardBeenRead,
  async (req: express.Request, res: express.Response) => {
    try {
      const { readerIDUsedByRecruiter: readerID, cardID } = res.locals;

      // Find the only recruiter who is using that reader based on readerID
      const recruiter = await Recruiters.findOne({
        where: {
          reader_id: readerID,
        },
      });
      const recruiterID = recruiter?.dataValues.id;

      // Save card scan to table `reader_history`
      const response = await ReaderHistory.create({
        card_id: cardID,
        recruiter_id: recruiterID,
      });
      if (!response) throw new Error("Error saving to reader_history");

      return res.json({
        success: "Card saved!",
        error: false,
      });
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
  console.log(`On ${PORT}`);
});
