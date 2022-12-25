import express from "express";
import Cards from "../db/models/Cards";
import Readers from "../db/models/Readers";

export const validateReader = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const readerID = req.body?.reader_id;

  if (!readerID || !readerID.trim()) {
    return res.status(400).send({ success: false, error: "Missing reader ID" });
  }

  // Check if reader in database
  const reader = await Readers.findOne({
    where: {
      serial_number: readerID,
    },
  });

  if (!reader) {
    return res.status(400).send({ success: false, error: "Invalid reader" });
  }

  next();
};

export const validateCardSerialNumber = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const serialNumber: string = req.body?.serial_number;

  if (!serialNumber || !serialNumber.trim()) {
    return res
      .status(400)
      .send({ success: false, error: "Missing serial number" });
  }

  if (serialNumber.length !== 14) {
    return res
      .status(400)
      .send({ success: false, error: "Invalid serial number" });
  }

  //  Check if card in database
  const card = await Cards.findOne({
    where: {
      serial_number: serialNumber,
    },
  });

  if (!card)
    return res.status(400).send({ success: false, error: "Invalid card" });

  next();
};
