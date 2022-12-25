import express from "express";

export const validateReader = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const readerID = req.body?.reader_id;

  if (!readerID || !readerID.trim()) {
    console.error("Missing reader ID");
    return res.status(400).send({ success: false, error: "Missing reader ID" });
  }

  // TODO: check reader in database
  //

  next();
};

export const validateCardSerialNumber = (
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

  //  TODO: check card in database
  //

  next();
};
