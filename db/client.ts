import { Client } from "pg";

const client = new Client({
  connectionString: process.env.DATABASE_URI,
  ssl: process.env.NODE_ENV === "production" ? true : false,
});

client
  .connect()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
  });

export default client;
