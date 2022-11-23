const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.get("/", (req, res) => {
  res.json({ success: true, error: false });
});

app.post("/api/reader", async (req, res) => {
  const cardSerialID = req.body.card_serial_id;
  console.log(cardSerialID.trim());

  res.json({
    success: true,
    error: false,
  });
});

app.listen(PORT, () => {
  console.log(`On ${PORT}`);
});
