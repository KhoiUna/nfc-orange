import Sequelize from "sequelize";
import { sequelize } from "../client";

const Companies = sequelize.define("companies", {
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
});

export default Companies;
