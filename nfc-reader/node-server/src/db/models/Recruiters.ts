import Sequelize from "sequelize";
import { sequelize } from "../client";

const Recruiters = sequelize.define("companies", {
  first_name: {
    type: Sequelize.STRING(45),
  },
  middle_name: {
    type: Sequelize.STRING(45),
  },
  last_name: {
    type: Sequelize.STRING(45),
  },
  email: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  created_at: {
    type: Sequelize.TIME,
    allowNull: false,
    defaultValue: new Date(Date.now()),
  },
  updated_at: {
    type: Sequelize.TIME,
  },
  company_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default Recruiters;
