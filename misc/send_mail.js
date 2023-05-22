// Script to send email with Nodemailer
"use strict";

require("dotenv").config();
const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("node:path");
const { Client } = require("pg");
const readline = require("node:readline/promises");

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

const sendMail = async (toAddress, subject, toName, emailTemplate) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "nfcorange1@gmail.com",
        pass: process.env.NODEMAILER_GMAIL_APP_PASSWORD,
      },
    });

    // Point to the template folder
    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve("./email_templates/"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./email_templates/"),
    };
    // Use a template file with nodemailer
    transporter.use("compile", hbs(handlebarOptions));

    // Send email
    const info = await transporter.sendMail({
      from: '"NFC Orange" <nfcorange1@gmail.com>',
      to: toAddress,
      subject,
      template: emailTemplate,
      context: {
        subject,
        name: toName, // replace {{name}} with `toName`
      },
    });
    if (!info.messageId) throw new Error("Error sending email");

    return info.messageId;
  } catch (error) {
    console.error(error);
    return;
  }
};

(async () => {
  const subject = process.argv[2];
  const emailTemplate = process.argv[3];

  if (!subject || !emailTemplate) {
    console.log(
      "Usage: node send_mail.js <email subject> <email template's name>"
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

  // CHANGE
  const sql = "SELECT first_name, last_name, email FROM users";

  const { rows } =
    isTesting === "y"
      ? {
          rows: [
            {
              first_name: "Demo",
              last_name: "Nguyen",
              email: "knguyen2@una.edu",
            },
            {
              first_name: "Khoi",
              last_name: "Nguyen",
              email: "nguyentuankhoi2112@gmail.com",
            },
            {
              first_name: "Test",
              last_name: "Nguyen",
              email: "thorwaitson@gmail.com",
            },
          ],
        }
      : await client.query(sql);

  console.log(rows.length, "emails to send:");

  let count = 1;
  for (const row of rows) {
    const name = `${row.first_name} ${row.last_name[0]}.`;
    const email = row.email;

    const response = await sendMail(email, subject, name, emailTemplate);
    if (!response) process.exit(1);

    console.log(`${count}. Successfully sent email to`, name);
    count++;
  }

  console.log("Send emails successfully!");
  process.exit();
})();
