import Sequelize from "sequelize";
import { sequelize } from "../client";

const ReaderHistory = sequelize.define("universities", {
  name: {
    type: Sequelize.STRING(255),
  },
});

export default ReaderHistory;
