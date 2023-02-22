import Sequelize from "sequelize";
import { sequelize } from "../client";

const SymplicityLinks = sequelize.define(
  "symplicity_resume_links",
  {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    url: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default SymplicityLinks;
