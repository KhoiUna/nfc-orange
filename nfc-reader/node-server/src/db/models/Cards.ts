import Sequelize from "sequelize";
import { sequelize } from "../client";

const Cards = sequelize.define("cards", {
  name: {
    type: Sequelize.STRING(255),
  },
});

export default Cards;
