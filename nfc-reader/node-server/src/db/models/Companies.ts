import Sequelize from "sequelize";
import { sequelize } from "../client";

const Companies = sequelize.define(
  "companies",
  {
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Companies;
