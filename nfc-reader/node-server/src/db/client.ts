const Sequelize = require("sequelize");

export const sequelize = new Sequelize(process.env.DATABASE_URI);

// Test the connection to the database
sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected!");
  })
  .catch((err: any) => {
    console.error("Error connecting to the database:", err);
  });
