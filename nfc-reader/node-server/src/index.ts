import express, { Application } from "express";
import { config } from "dotenv";
import {
  checkIfCardBeenRead,
  validateCardSerialNumber,
  validateReader,
} from "./middlewares/middlewares";
import ReaderHistory from "./db/models/ReaderHistory";
import Recruiters from "./db/models/Recruiters";
import Cards from "./db/models/Cards";

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
    const serialNumber: string = req.body.serial_number;

    if (!serialNumber || !serialNumber.trim())
      return res
        .status(400)
        .send({ success: false, error: "Missing serial number" });

    if (serialNumber.length !== 14)
      return res
        .status(400)
        .send({ success: false, error: "Invalid serial number" });

    // TODO: generate 6 digit password (optional)
    //

    // Check if card exists in database
    const card = await Cards.findOne({
      where: {
        serial_number: serialNumber,
      },
    });
    if (card)
      return res.status(400).send({ success: false, error: "Invalid card" });

    // Save to new cards to DB
    const response = await Cards.create({
      serial_number: serialNumber,
    });
    if (!response) throw new Error("Error saving new card");

    return res.json({
      success: "New card saved",
      error: false,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
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
