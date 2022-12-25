import express, { Application } from "express";
import { config } from "dotenv";
import {
  validateCardSerialNumber,
  validateReader,
} from "./middlewares/middlewares";

config();

const app: Application = express();

const PORT = process.env.PORT || 3000;

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.get("/api/reader", (req: express.Request, res: express.Response) => {
  res.json({ success: "hi world", error: false });
});

app.post(
  "/api/reader",
  validateReader,
  validateCardSerialNumber,
  async (req: express.Request, res: express.Response) => {
    const { serial_number, reader_id } = req.body;

    // TODO: save to table `reader_history`
    //

    res.json({
      success: "Card saved!",
      error: false,
    });
  }
);

app.listen(PORT, () => {
  console.log(`On ${PORT}`);
});
