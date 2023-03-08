import express from "express";
import Cards from "../db/models/Cards";
import ReaderHistory from "../db/models/ReaderHistory";
import Readers from "../db/models/Readers";
import Recruiters from "../db/models/Recruiters";

export const validateReader = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const readerID = req.body?.reader_id;

    if (!readerID || !readerID.trim()) {
      return res
        .status(400)
        .send({ success: false, error: "Missing reader ID" });
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

    const readerIDUsedByRecruiter = reader.dataValues.id;
    res.locals.readerIDUsedByRecruiter = readerIDUsedByRecruiter;

    // Check if reader is currently being used
    const recruiter = await Recruiters.findOne({
      where: {
        reader_id: readerIDUsedByRecruiter,
      },
    });
    if (!recruiter) {
      return res.status(400).send({ success: false, error: "Invalid reader" });
    }
    res.locals.recruiterID = recruiter.dataValues.id;

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const validateCardSerialNumber = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const serialNumber: string = req.body?.serial_number;

    if (!serialNumber || !serialNumber.trim())
      return res
        .status(400)
        .send({ success: false, error: "Missing serial number" });

    if (serialNumber.length !== 14)
      return res
        .status(400)
        .send({ success: false, error: "Invalid serial number" });

    //  Check if card in database
    const card = await Cards.findOne({
      where: {
        serial_number: serialNumber,
      },
    });

    if (!card)
      return res.status(400).send({ success: false, error: "Invalid card" });

    const cardID = card?.dataValues.id;
    res.locals.cardID = cardID;

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const checkIfCardBeenRead = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { cardID, recruiterID } = res.locals;

    const readerHistory = await ReaderHistory.findOne({
      where: {
        card_id: cardID,
        recruiter_id: recruiterID,
      },
    });
    if (readerHistory)
      return res
        .status(400)
        .send({ success: false, error: "Card has been read" });

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
