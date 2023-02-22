import Sequelize from "sequelize";
import { sequelize } from "../client";

const Users = sequelize.define(
  "users",
  {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Users;
