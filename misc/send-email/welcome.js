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
  const toName = process.argv[2];
  let toEmail = process.argv[3];

  if (!toName || !toEmail) {
    console.log("Usage: node send_mail.js <to name> <to email>");
    process.exit(1);
  }

  let isTesting = await rl.question("Is this for testing? (y/n) ");
  do {
    isTesting = await rl.question("Is this for testing? (y/n) ");
  } while (!isTesting || isTesting.length === 0);

  toEmail = isTesting === "y" ? "thorwaitson@gmail.com" : toEmail;

  const SUBJECT = "🙏 Thank you for joining the waitlist from NFC Orange 🍊";
  const TEMPLATE = "welcome";
  const response = await sendMailgun(toEmail, SUBJECT, toName, TEMPLATE);
  if (!response) process.exit(1);

  console.log(`Successfully sent email to ${toName}<${toEmail}>`);
  console.log("Send email successfully!");
  process.exit();
})();
