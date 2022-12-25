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

app.get("/", (req: express.Request, res: express.Response) => {
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
    console.log("save card to db");
    console.log(reader_id, serial_number);

    res.json({
      success: true,
      error: false,
    });
  }
);

app.listen(PORT, () => {
  console.log(`On ${PORT}`);
});
