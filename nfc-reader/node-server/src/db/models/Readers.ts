import Sequelize from "sequelize";
import { sequelize } from "../client";

const Readers = sequelize.define("readers", {
  serial_number: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  secret_key: {
    type: Sequelize.TEXT,
  },
  created_at: {
    type: Sequelize.TIME,
    allowNull: false,
    defaultValue: new Date(Date.now()),
  },
});

export default Readers;
