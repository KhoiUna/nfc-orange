// Scripts to update `links` with resume URLs from `symplicity_resume_links`

"use strict";

require("dotenv").config();
const { Client } = require("pg");

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

// This func returns all user IDs that have `symplicity_resume_links`
const getAllUserIDs = async () => {
  const query = "SELECT user_id from symplicity_resume_links;";
  const response = await client.query(query);
  return response.rows;
};

(async () => {
  try {
    const userIDRows = await getAllUserIDs();

    for (const row of userIDRows) {
      const userID = row.user_id;

      const { rows: userUploadLink } = await client.query(
        "SELECT url FROM links WHERE user_id=$1",
        [userID]
      );

      if (userUploadLink.length > 0) continue;

      const response = await client.query(
        "INSERT INTO links(user_id, url) VALUES ($1, (SELECT url FROM symplicity_resume_links WHERE user_id=$1))",
        [userID]
      );
      if (!response) throw "Error inserting";
    }

    console.log("Update successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
