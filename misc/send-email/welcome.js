// Script to send email with Nodemailer
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
  connectionString: process.env.DATABASE_URI,
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
  const subject = process.argv[2];
  const toName = process.argv[3];
  let toEmail = process.argv[4];

  if (!subject || !toName || !toEmail) {
    console.log(
      "Usage: node send_mail.js <email subject> <to name> <to email>"
    );
    process.exit(1);
  }
  if (subject.length < 10) {
    console.log("Warn: email subject too short!");
    process.exit(1);
  }

  let isTesting = await rl.question("Is this for testing? (y/n) ");
  do {
    isTesting = await rl.question("Is this for testing? (y/n) ");
  } while (!isTesting || isTesting.length === 0);

  toEmail = isTesting === "y" ? "thorwaitson@gmail.com" : toEmail;

  const response = await sendMailgun(toEmail, subject, toName, "welcome");
  if (!response) process.exit(1);

  console.log(`Successfully sent email to ${toName}<${toEmail}>`);
  console.log("Send emails successfully!");
  process.exit();
})();
