import Sequelize from "sequelize";
import { sequelize } from "../client";

const Universities = sequelize.define(
  "universities",
  {
    name: {
      type: Sequelize.STRING(255),
    },
  },
  {
    timestamps: false,
  }
);

export default Universities;
