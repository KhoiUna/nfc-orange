import Sequelize from "sequelize";
import { sequelize } from "../client";

const Cards = sequelize.define(
  "cards",
  {
    serial_number: {
      type: Sequelize.CHAR(14),
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

export default Cards;
