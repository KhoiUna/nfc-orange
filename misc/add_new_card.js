// Script to add new NFC card

"use strict";

require("dotenv").config();
const { Client } = require("pg");
const { v4: uuidv4 } = require("uuid");

const client = new Client({
  connectionString: process.env.DATABASE_URI,
});

client
  .connect()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
  });

(async () => {
  try {
    const uuid = uuidv4();

    const response = await client.query("INSERT INTO cards(uuid) VALUES ($1)", [
      uuid,
    ]);
    if (!response) throw "Error inserting new card";

    console.log("Add new card successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
