import { Client } from "pg";

const client = new Client({
  connectionString: process.env.DATABASE_URI,
});

client
  .connect()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error: any) => {
    console.error("Error connecting to database", error);
  });

export default client;
