import { config } from "dotenv";
import { Sequelize } from "sequelize";

config();

export const sequelize = new Sequelize(process.env.DATABASE_URI as string, {
  dialect: "postgres",
});

// Test the connection to the database
sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected!");
  })
  .catch((err: any) => {
    console.error("Error connecting to the database:", err);
  });
