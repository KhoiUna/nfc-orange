// Script to send Stripe payment link to users who have accounts set up
"use strict";

require("dotenv").config();
const { Client } = require("pg");
const readline = require("node:readline/promises");
const { sendMailgun } = require("../lib/email");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new Client({
  connectionString: process.env.BIZ_DATABASE_URI,
});

client
  .connect()
  .then(() => {
    console.log("Database connected!");
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
  });

(async () => {
  let isTesting = await rl.question("Is this for testing? (y/n) ");
  do {
    isTesting = await rl.question("Is this for testing? (y/n) ");
  } while (!isTesting || isTesting.length === 0);

  const sql =
    "SELECT id, first_name, last_name, email FROM users WHERE updated_at is null and last_logged_in is null";

  let { rows } = await client.query(sql);

  if (isTesting === "y") {
    rows = rows.map((row) => ({ ...row, email: "knguyen2@una.edu" }));
  }

  console.log(rows.length, "emails to send:");

  let count = 1;
  for (const row of rows) {
    const name = `${row.first_name} ${row.last_name[0]}.`;
    const email = row.email;

    const response = await sendMailgun(
      email,
      "Complete your purchase | NFC Orange 🍊",
      name,
      "payment"
    );
    if (!response) process.exit(1);

    console.log(`${count}. Successfully sent email to ${name}<${row.email}>`);
    count++;
  }

  console.log("Send emails successfully!");
  process.exit();
})();
