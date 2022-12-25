import Sequelize from "sequelize";
import { sequelize } from "../client";

const ReaderHistory = sequelize.define("reader_history", {
  recruiter_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  serial_number: {
    type: Sequelize.CHAR(14),
  },
  read_at: {
    type: Sequelize.TIME,
    allowNull: false,
  },
  reader_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default ReaderHistory;
