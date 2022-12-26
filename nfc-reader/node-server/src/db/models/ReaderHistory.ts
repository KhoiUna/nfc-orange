import Sequelize from "sequelize";
import { sequelize } from "../client";

const ReaderHistory = sequelize.define(
  "reader_histories",
  {
    recruiter_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    card_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    read_at: {
      type: Sequelize.TIME,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  {
    timestamps: false,
  }
);

export default ReaderHistory;
